<template>
  <div>
      <h3 v-show="!is_authenticated">необходимо авторизоваться</h3>
      <div>
        <label for="withdrawal-currency">валюта</label>
        <select id="withdrawal-currency" v-model="newWithdrawalRate.currency">
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </select>
      </div>
      <br />
      <div>
        <label for="withdrawal-amount">сумма</label>
        <input id="withdrawal-amount" v-model="amount" type="number"/>
      </div>
      <br />
      <div>
        <label for="withdrawal-btc">сумма в BTC?</label>
        <input id="withdrawal-btc" v-model="btc" type="checkbox"/>
      </div>
      <br>
      <div>
        <label for="withdrawal-client">адрес перевода</label>
        <input id="withdrawal-client" v-model="newWithdrawal.address"/>
      </div>
      <br />
      <button @click="createWithdrawal()">создать</button>
      <table>
        <tr>
          <th>ID</th>
          <th>status</th>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </table>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'withdrawal',
  data: function () {
    return {
      amount: null,
      btc: false,
      newWithdrawalRate: {
        from_currency: 'EUR',
        to_currency: 'BTC'
      },
      newWithdrawal: {
        address: null,
        withdrawal_token: null
      },
      message: null,
      createdWithdraw: {
        id: null,
        status: null
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
        })
        .catch((e) => {
          console.log(e.response)
        })
    },
    createWithdrawal () {
      this.getWithdrawalToken()
      if (!this.newWithdrawal.withdrawal_token) return
      const body = JSON.stringify(this.newWithdrawal)
      this.$http
        .post('/v1.0/withdraw', body)
        .then((r) => {
          console.log(r.data)
          this.createdWithdraw = r.data
          this.$store.dispatch('addWithdrawId', r.data.id)
        })
        .catch((e) => {
          console.log(e.response.status)
          console.log(e.response.data)
          this.message = e.response.data.message
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
