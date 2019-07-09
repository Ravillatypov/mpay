<template>
  <div class="md-layout md-gutter">
      <div class="md-layout-item">
      <md-table md-card v-show="showList">
        <md-table-toolbar>
          <h1 class="md-title">кошелек</h1>
        </md-table-toolbar>
        <md-table-row>
          <md-table-head>валюта</md-table-head>
          <md-table-head>баланс</md-table-head>
          <md-table-head>доступно</md-table-head>
        </md-table-row>
        <md-table-row v-for="item in walletsList" :key="item.id">
          <md-table-cell>{{item.currency}}</md-table-cell>
          <md-table-cell>{{item.balance}}</md-table-cell>
          <md-table-cell>{{item.available}}</md-table-cell>
        </md-table-row>
      </md-table>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { setInterval } from 'timers'
export default {
  name: 'invoice',
  data: function () {
    return {
      walletsList: [],
      timer: null
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
          if (e.response.status === 401 && this.is_authenticated) this.update()
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
          console.log(e)
          localStorage.removeItem('token_get_body')
          localStorage.removeItem('client_token')
          this.$store.dispatch('logOut')
          this.$router.push('/Auth')
        })
    }
  },
  computed: {
    ...mapGetters(['is_authenticated']),
    showList: function () {
      return this.walletsList.length > 0
    }
  },
  mounted: function () {
    this.update()
    this.timer = setInterval(() => this.update(), 5000)
  }
}
</script>

<style>
</style>
