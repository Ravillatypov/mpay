<template>
  <div>
    <md-content class="md-elevation-3">
      <div class="form main">
        <md-field>
          <label>client_id</label>
          <md-input v-model="oauth2Token.client_id" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>client_secret</label>
          <md-input v-model="oauth2Token.client_secret" type="password"></md-input>
        </md-field>

        <md-button class="md-primary md-raised md-elevation-1" @click="getToken()">войти</md-button>
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
          console.log('auth success')
          this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + r.data.access_token
          localStorage.client_token = r.data.access_token
          localStorage.token_get_body = body
          this.$store.dispatch('logIn')
          this.$router.push('/')
        })
        .catch((e) => {
          console.log('auth failed')
          console.log(e)
          this.message = e.response
          localStorage.removeItem('token_get_body')
          localStorage.removeItem('client_token')
          this.$store.dispatch('logOut')
        })
    }
  },
  mounted () {
    this.oauth2Token.client_id = localStorage.client_id || ''
    this.oauth2Token.client_secret = localStorage.client_secret || ''
  }
}
</script>

<style>
</style>
