<template>
  <md-steppers :md-active-step.sync="steps" md-linear>
    <md-step id="first" :md-editable="false" :md-done.sync="first">
      <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field>
            <label for="withdrawal-currency">валюта</label>
              <md-select id="withdrawal-currency" v-model="newWithdrawalRate.from_currency">
                <md-option value="USD">USD</md-option>
                <md-option value="EUR">EUR</md-option>
              </md-select>
            </md-field>
            <md-field>
              <label for="withdrawal-amount">сумма</label>
              <md-input id="withdrawal-amount" v-model="amount" type="number"/>
            </md-field>
              <md-switch v-model="btc" class="md-primary">сумма в BTC?</md-switch>
            <md-field>
              <label for="withdrawal-client">адрес перевода</label>
              <md-input id="withdrawal-client" v-model="newWithdrawal.address"/>
            </md-field>
            <md-button class="md-primary" @click="getWithdrawalToken()">создать</md-button>
          </div>
          <p>{{message}}</p>
      </div>
    </md-step>
    <md-step id="second" :md-editable="false" :md-done.sync="second">
      <md-card>
        <md-card-header>
          <div class="md-title">подвердите данные</div>
        </md-card-header>
        <md-card-content>
          <md-list>
            <md-list-item>
              <span class="md-list-item-text">сумма списания: {{withdrawRate.from_amount}} {{withdrawRate.from_currency}}</span>
            </md-list-item>
            <md-list-item>
              <span class="md-list-item-text">сумма начисления: {{withdrawRate.to_amount}} BTC</span>
            </md-list-item>
            <md-list-item>
              <span class="md-list-item-text">комиссия: {{withdrawRate.fee_amount}} {{withdrawRate.fee_currency}}</span>
            </md-list-item>
          </md-list>
          <p>{{message}}</p>
        </md-card-content>
        <md-card-actions>
          <md-button class="md-secondary" @click="steps='fists';message=''">отмена</md-button>
          <md-button class="md-primary" @click="createWithdrawal()">подвердить</md-button>
        </md-card-actions>
      </md-card>
    </md-step>
    <md-step id="finish" :md-editable="false" :md-done.sync="finish">
      <md-table md-card v-show="createdWithdraw.id">
        <md-table-toolbar>
          <h1 class="md-title">создан запрос на вывод</h1>
        </md-table-toolbar>
        <md-table-row>
          <md-table-head>ID</md-table-head>
          <md-table-head>статус</md-table-head>
        </md-table-row>
        <md-table-row>
          <md-table-cell>{{createdWithdraw.id}}</md-table-cell>
          <md-table-cell>{{createdWithdraw.status}}</md-table-cell>
        </md-table-row>
      </md-table>
    </md-step>
  </md-steppers>
</template>

<script>
import {mapGetters} from 'vuex'
import { setInterval, clearInterval } from 'timers'
import log from 'electron-log'
export default {
  name: 'withdrawal',
  data: function () {
    return {
      amount: null,
      btc: false,
      message: null,
      steps: null,
      first: false,
      second: false,
      finish: false,
      timer: null,
      createdWithdrawID: null,
      newWithdrawalRate: {
        from_currency: 'USD',
        to_currency: 'BTC'
      },
      newWithdrawal: {
        address: null,
        withdrawal_token: null
      },
      createdWithdraw: {
        id: null,
        status: null
      },
      withdrawRate: {
        from_currency: null,
        from_amount: null,
        to_amount: null,
        fee_amount: null,
        fee_currency: null
      }
    }
  },
  methods: {
    getWithdrawalToken () {
      if (this.newWithdrawal.btc) {
        this.newWithdrawalRate.to_amount = this.amount
      } else {
        this.newWithdrawalRate.from_amount = this.amount
      }
      this.$http
        .get('/v1.0/withdraw/rate', {
          params: this.newWithdrawalRate
        })
        .then((r) => {
          console.log(r.data)
          this.newWithdrawal.withdrawal_token = r.data.withdrawal_token
          this.first = true
          this.withdrawRate = r.data
          this.steps = 'second'
        })
        .catch((e) => {
          console.log(e.response)
          log.warn(e.response)
          if (e.response.status === 401) this.updateToken()
          if (this.is_authenticated && e.response.status === 401) this.getWithdrawalToken()
          else {
            this.message = e.response.data.message
          }
        })
    },
    createWithdrawal () {
      this.message = ''
      if (!this.newWithdrawal.withdrawal_token) return
      const body = JSON.stringify(this.newWithdrawal)
      this.$http
        .post('/v1.0/withdraw', body)
        .then((r) => {
          console.log(r.data)
          this.createdWithdrawID = r.data.id
          let parsed = JSON.parse(localStorage.withdraw_ids || '[]')
          parsed.push(r.data.id)
          localStorage.withdraw_ids = JSON.stringify(parsed)
          this.second = true
          this.steps = 'finish'
          this.getWithdrawByID()
          this.timer = setInterval(() => {
            this.getWithdrawByID()
          }, 1800)
        })
        .catch((e) => {
          log.warn(e.response)
          console.log(e.response)
          if (e.response.status === 401) this.updateToken()
          if (e.response.status === 401 && this.is_authenticated) this.createWithdrawal()
          else {
            this.message = e.response.data.message
          }
        })
    },
    updateToken () {
      this.$http
        .post('/oauth2/token', localStorage.client_token)
        .then((r) => {
          console.log('auth success')
          this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + r.data.access_token
        })
        .catch((e) => {
          console.log('auth failed')
          log.warn(e.response)
          console.log(e)
          localStorage.removeItem('token_get_body')
          localStorage.removeItem('client_token')
          this.$store.dispatch('logOut')
          this.$router.push('/Auth')
        })
    },
    getWithdrawByID () {
      this.$http
        .get('/v1.0/withdraw/' + this.createdWithdrawID)
        .then((r) => {
          this.createdWithdraw = r.data
          if (this.createdWithdraw.status === 'completed') clearInterval(this.timer)
        })
        .catch((e) => {
          console.log(e.response)
          log.warn(e.response)
          if (e.response.status === 401) {
            this.$updateAuthToken()
            if (this.is_authenticated) this.getWithdrawByID()
          } else {
            this.message = e.response.data.message
          }
        })
    }
  },
  computed: {
    ...mapGetters(['is_authenticated'])
  }
}
</script>

<style>
</style>
