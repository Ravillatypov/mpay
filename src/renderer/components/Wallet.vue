<template>
  <div>
      <h3>{{status}}</h3>
      <table v-if="showList">
        <tr>
          <th>валюта</th>
          <th>баланс</th>
          <th>доступно</th>
        </tr>
        <tr v-for="item in walletsList" :key="item.id">
          <td>{{item.currency}}</td>
          <td>{{item.balance}}</td>
          <td>{{item.available}}</td>
        </tr>
      </table>
  </div>
</template>

<script>
export default {
  name: 'invoice',
  data: function () {
    return {
      walletsList: []
    }
  },
  methods: {
    update () {
      this.$http
        .get('/v1.0/wallets')
        .then((r) => {
          this.walletsList = r.data
        })
        .catch((e) => {
          console.log(e.response.status)
          console.log(e.response.data)
          if (e.response.status === 401) this.updateToken()
        })
    },
    updateToken () {
      this.$store.dispatch('updateToken')
      if (this.$store.getters.isAuthenticated) {
        this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken
        this.update()
      }
    }
  },
  computed: {
    status: function () {
      if (!this.$store.getters.isAuthenticated) {
        return 'необходимо авторизоваться'
      }
      return ''
    },
    showList: function () {
      return this.walletsList.length > 0
    }
  },
  mounted: function () {
    this.update()
  }
}
</script>

<style>
</style>
