<template>
  <div>
    <div v-if="!token">
      <div>
        <label for="client-id">логин</label>
        <input id="client-id" v-model="clientId" />
      </div>
      <br />
      <div>
        <label for="client-pass">пароль</label>
        <input id="client-pass" v-model="clientSecret" />
      </div>
      <br />
      <button @click="getToken()">авторизоваться</button>
    </div>
    <div v-if="token">
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
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'landing-page',
  data: function () {
    return {
      clientId: null,
      clientSecret: null,
      token: null,
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
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    getToken () {
      const body = JSON.stringify({
        'grant_type': 'client_credentials',
        'client_id': this.clientId,
        'client_secret': this.clientSecret
      })
      this.$http
        .post('/oauth2/token', body)
        .then((r) => {
          this.token = r.data.access_token
          this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
        })
        .catch((error) => {
          console.log(error.response.status)
          console.log(error.response.data)
          this.message = error.response.data
        })
    },
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
          this.message = e.response.data
        })
    }
  }
}
</script>

<style>
</style>
