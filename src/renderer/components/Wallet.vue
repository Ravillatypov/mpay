<template>
  <div>
      <h3 v-show="!is_authenticated">необходимо авторизоваться</h3>
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
import {mapGetters} from 'vuex'
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
    ...mapGetters(['withdrawIds', 'is_authenticated']),
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
