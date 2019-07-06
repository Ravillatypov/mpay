<template>
  <div>
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
      <div>
        {{message}}
      </div>
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
      message: null
    }
  },
  methods: {
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
          this.message = error.response.data.message
        })
    },
    clear () {
      this.clientId = null
      this.clientSecret = null
    }
  }
}
</script>

<style>
</style>
