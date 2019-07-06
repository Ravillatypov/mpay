<template>
  <div>
  <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Авторизация</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="clientId" label="ID" required></v-text-field>
                  <v-text-field v-model="clientSecret" label="secret" required></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="getToken()" color="primary">авторизация</v-btn>
                <v-btn @click="clear()">сбросить</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-alert v-model="message"></v-alert>
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
