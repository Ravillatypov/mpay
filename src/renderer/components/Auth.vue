<template>
  <div>
    <md-content class="md-elevation-3">
      <div class="form main">
        <md-field>
          <label>логин</label>
          <md-input v-model="clientId" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>пароль</label>
          <md-input v-model="clientSecret" type="password"></md-input>
        </md-field>

        <md-button class="md-primary md-raised md-elevation-1" @click="getToken()">авторизация</md-button>
        </div>
    </md-content>
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
          this.$store.dispatch('setAuthStatus', true)
        })
        .catch((error) => {
          console.log(error.response.status)
          console.log(error.response.data)
          this.message = error.response.data.message
          this.$store.dispatch('setAuthStatus', false)
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
