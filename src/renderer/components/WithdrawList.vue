<template>
  <div>
      <table v-if="withdrawIds.length">
        <caption>withdraws</caption>
        <tr>
          <th>ID</th>
          <th>адрес</th>
          <th>сумма</th>
          <th>статус</th>
        </tr>
        <tr v-for="item in withdraws" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.details.address}}</td>
          <td>{{item.details.amount}} BTC</td>
          <td>{{item.status}}</td>
        </tr>
      </table>
      <p>{{message}}</p>
  </div>
</template>

<script>
import log from 'electron-log'
export default {
  name: 'invoice',
  data: function () {
    return {
      message: null,
      withdraws: []
    }
  },
  computed: {
    withdrawIds: () => JSON.parse(localStorage.withdraw_ids || '[]')
  },
  mounted () {
    for (let id of localStorage.withdrawIds.withdraw_ids || []) {
      let obj = this.getWithdrawByID(id)
      if (obj) this.withdraws.push(obj)
    }
  },
  methods: {
    getWithdrawByID (id) {
      let result = null
      this.$http
        .get('/v1.0/withdraw/' + id)
        .then(r => { result = r.data })
        .catch((e) => {
          console.log(e.response)
          log.warn('can`t get withdraw')
          log.warn(e.response)
          if (e.response.status === 401) {
            this.$updateAuthToken()
            if (this.is_authenticated) this.getWithdrawByID(id)
          } else {
            this.message = e.response.data.message
          }
        })
      return result
    },
    updateToken () {
      this.$http
        .post('/oauth2/token', localStorage.client_token)
        .then((r) => {
          console.log('auth success')
          log.info('token updated')
          this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + r.data.access_token
        })
        .catch((e) => {
          console.log('auth failed')
          console.log(e)
          log.warn(e.response)
          localStorage.removeItem('token_get_body')
          localStorage.removeItem('client_token')
          this.$store.dispatch('logOut')
          this.$router.push('/Auth')
        })
    }
  }
}
</script>

<style>
</style>
