import axios from 'axios'
import Config from '../config'

const AuthPlugin = {}

axios.defaults.baseURL = Config.BaseURL
axios.defaults.headers.post['Content-Type'] = 'application/js'
if (localStorage.client_token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.client_tokenon

AuthPlugin.install = function (Vue, options) {
  Vue.http = Vue.prototype.$http = axios
  Vue.prototype.$updateAuthToken = function () {
    Vue.prototype.$http
      .post('/oauth2/token', localStorage.token_get_body)
      .then((r) => {
        Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + r.data.access_token
        localStorage.client_token = r.data.access_token
        Vue.prototype.$store.dispatch('logIn')
        return true
      })
      .catch((e) => {
        console.log(e)
        localStorage.token_get_body = false
        localStorage.client_token = false
        Vue.prototype.$store.dispatch('logOut')
        return false
      })
  }
}

export default AuthPlugin
