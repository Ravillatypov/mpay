<template>

<md-steppers :md-active-step.sync="steps" md-linear>
  <md-step id="first" md-label="получить курс обмена" :md-editable="false" :md-done.sync="first">
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
  <md-step id="second" md-label="запрос на вывод" :md-editable="false" :md-done.sync="second">
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
        <md-button class="md-secondary" @click="steps='fists'">отмена</md-button>
        <md-button class="md-primary" @click="createWithdrawal()">подвердить</md-button>
      </md-card-actions>
    </md-card>
  </md-step>
  <md-step id="finish" md-label="создан запрос на вывод" :md-editable="false" :md-done.sync="finish">
    <md-table md-card v-show="createdWithdraw.id">
      <md-table-toolbar>
        <h1 class="md-title">создан запрос на вывод</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>status</md-table-head>
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
      newWithdrawalRate: {
        from_currency: 'EUR',
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
          this.message = e.response.data.message
        })
    },
    createWithdrawal () {
      if (!this.newWithdrawal.withdrawal_token) return
      const body = JSON.stringify(this.newWithdrawal)
      this.$http
        .post('/v1.0/withdraw', body)
        .then((r) => {
          console.log(r.data)
          this.createdWithdraw = r.data
          this.$store.dispatch('addWithdrawId', r.data.id)
          this.second = true
          this.steps = 'finish'
        })
        .catch((e) => {
          console.log(e.response.status)
          console.log(e.response.data)
          this.message = e.response.data
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
