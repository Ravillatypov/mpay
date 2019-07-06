<template>
  <div>
      <p>{{status}}</p>
      <div>
        <label for="invoice-currency">валюта</label>
        <input id="invoice-currency" v-model="newInvoice.currency" />
      </div>
      <br />
      <div>
        <label for="invoice-amount">сумма</label>
        <input id="invoice-amount" v-model="newInvoice.amount" type="number"/>
      </div>
      <br>
      <div>
        <label for="invoice-client">e-mail клиента</label>
        <input id="invoice-client" v-model="newInvoice.client.email"/>
      </div>
      <br />
      <button @click="createInvoice()">создать</button>
  </div>
</template>

<script>
export default {
  name: 'invoice',
  data: function () {
    return {
      newInvoice: {
        currency: 'EUR',
        amount: null,
        name: null,
        description: null,
        client: {
          email: null
        }
      },
      message: null
    }
  },
  methods: {
    createInvoice () {
      const body = JSON.stringify(this.newInvoice)
      this.$http
        .post('/v1.0/invoices', body)
        .then((r) => {
          this.message = 'создан счет с id: ' + r.data.id
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
    }
  }
}
</script>

<style>
</style>
