<template>
  <div>
      <h3>{{status}}</h3>
      <button @click="update()">обновить список</button>
      <table v-if="showList">
        <caption>список счетов</caption>
        <tr>
          <th>ID</th>
          <th>валюта</th>
          <th>сумма</th>
          <th>статус</th>
        </tr>
        <tr v-for="item in invoiceList" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.currency}}</td>
          <td>{{item.amount}}</td>
          <td>{{item.status}}</td>
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
      invoiceList: [],
      message: null
    }
  },
  methods: {
    update () {
      this.$http
        .get('/v1.0/invoices')
        .then((r) => {
          this.invoiceList = r.data
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
      return this.invoiceList.length > 0
    }
  }
}
</script>

<style>
</style>
