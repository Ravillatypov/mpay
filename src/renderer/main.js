import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import Config from './config'

Vue.use(VueMaterial)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
axios.defaults.baseURL = Config.BaseURL
axios.defaults.headers.post['Content-Type'] = 'application/json'
if (localStorage.client_token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('client_token')
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
})
app.$mount('#app')
