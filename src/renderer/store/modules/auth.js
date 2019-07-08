import axios from 'axios'
import Config from '../../config'

axios.defaults.baseURL = Config.BaseURL
axios.defaults.headers.post['Content-Type'] = 'application/json'

const state = {
  is_authenticated: null,
  body: null,
  token: null
}

const mutations = {
  SET_STATUS (state, status) {
    state.is_authenticated = status.status
    state.body = status.body
    state.token = status.token
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
  }
}

const getters = {
  isAuthenticated: state => state.is_authenticated,
  getToken: state => state.token
}

export default {
  state,
  mutations,
  actions,
  getters
}
