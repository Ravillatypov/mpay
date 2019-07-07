<template>
  <div>
      <h3>{{status}}</h3>
      <button @click="update()">обновить список</button>
      <table v-if="showList">
        <caption>кашельки</caption>
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
      <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'invoice',
  data: function () {
    return {
      walletsList: [],
      message: null
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
          this.message = e.response.data.message
        })
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
  }
}
</script>

<style>
</style>
