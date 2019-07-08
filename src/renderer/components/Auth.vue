<template>
  <div>
    <md-content class="md-elevation-3">
      <div class="form main">
        <md-field>
          <label>логин</label>
          <md-input v-model="oauth2Token.client_id" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>пароль</label>
          <md-input v-model="oauth2Token.client_secret" type="password"></md-input>
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
      oauth2Token: {
        grant_type: 'client_credentials',
        client_id: null,
        client_secret: null
      },
      token: null,
      message: null
    }
  },
  methods: {
    getToken () {
      const body = JSON.stringify(this.oauth2Token)
      this.$http
        .post('/oauth2/token', body)
        .then((r) => {
          this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + r.data.access_token
          this.$store.dispatch('setAuthStatus', {
            status: true,
            body,
            token: r.data.access_token
          })
          localStorage.setItem('client_secret', this.oauth2Token.client_secret)
          localStorage.setItem('client_id', this.oauth2Token.client_id)
          localStorage.setItem('token_get_body', body)
          localStorage.setItem('client_token', r.data.access_token)
        })
        .catch((error) => {
          console.log(error.response.status)
          console.log(error.response.data)
          this.message = error.response.data.message
          this.$store.dispatch('setAuthStatus', {
            status: false,
            body: null,
            token: null
          })
        })
    }
  },
  mounted () {
    if (localStorage.client_id) this.oauth2Token.client_id = localStorage.client_id
    if (localStorage.client_secret) this.oauth2Token.client_secret = localStorage.client_secret
  }
}
</script>

<style>
</style>
