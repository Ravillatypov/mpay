import axios from 'axios'
import Config from '../../config'

axios.defaults.baseURL = Config.BaseURL
axios.defaults.headers.post['Content-Type'] = 'application/json'

const state = {
  is_authenticated: null,
  body: null,
  token: null
}

if (localStorage.client_token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('client_token')
  state.token = localStorage.getItem('client_token')
  state.is_authenticated = true
}
if (localStorage.token_get_body) state.body = localStorage.getItem('token_get_body')

const mutations = {
  SET_STATUS (state, status) {
    state.is_authenticated = status.status
    state.body = status.body
    state.token = status.token
  },
  LOG_OUT (state) {
    state.is_authenticated = false
  }
}

const actions = {
  setAuthStatus ({commit}, status) {
    commit('SET_STATUS', status)
  },
  updateToken ({commit, state}) {
    axios
      .get('/oauth2/token', state.body)
      .then((r) => {
        commit('SET_STATUS', {
          status: true,
          body: state.body,
          token: r.data.access_token
        })
      })
      .catch((e) => {
        console.log(e.response.status)
        console.log(e.response.data)
        commit('SET_STATUS', {
          status: false,
          body: state.body,
          token: null
        })
      })
  },
  logOut ({commit}) {
    commit('LOG_OUT')
  }
}

const getters = {
  is_authenticated: state => state.is_authenticated,
  getToken: state => state.token
}

export default {
  state,
  mutations,
  actions,
  getters
}
