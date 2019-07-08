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
          if (e.response.status === 401 && this.have_body) this.updateToken()
        })
    },
    updateToken () {
      this.$store.dispatch('updateToken')
      if (this.is_authenticated) {
        this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + this.getToken
        this.update()
      }
    }
  },
  computed: {
    ...mapGetters(['withdrawIds', 'is_authenticated', 'have_body', 'getToken']),
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
