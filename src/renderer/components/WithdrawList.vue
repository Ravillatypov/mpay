<template>
  <div>
      <h3 v-show="!is_authenticated">необходимо авторизоваться</h3>
      <table v-if="withdrawIds.length">
        <caption>withdraws</caption>
        <tr>
          <th>ID</th>
          <th>address</th>
          <th>amount</th>
          <th>status</th>
        </tr>
        <tr v-for="item in withdraws" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.details.address}}</td>
          <td>{{item.details.amount}}</td>
          <td>{{item.status}}</td>
        </tr>
      </table>
      <p>{{message}}</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'invoice',
  data: function () {
    return {
      message: null,
      withdraws: []
    }
  },
  computed: {
    ...mapGetters(['withdrawIds', 'is_authenticated'])
  },
  mounted () {
    for (let id of this.withdrawIds) {
      let obj = this.getWithdrawByID(id)
      if (obj) this.withdraws = this.withdraws.concat(obj)
    }
  },
  methods: {
    getWithdrawByID (id) {
      let result = null
      this.$http
        .get('/v1.0/withdraw/' + id)
        .then(r => { result = r.data })
        .catch(e => {
          console.log(e.response)
        })
      return result
    }
  }
}
</script>

<style>
</style>
