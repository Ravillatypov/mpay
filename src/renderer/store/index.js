import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'
import axios from 'axios'
import Config from '../config'

Vue.use(Vuex)

axios.defaults.baseURL = Config.BaseURL
axios.defaults.headers.post['Content-Type'] = 'application/json'

const state = {
  is_authenticated: null,
  body: null,
  token: null,
  withdrawIds: []
}
// ++++++++++++ загрузка данных из localStorage ++++++++++++++++
if (localStorage.client_token) {
  state.token = localStorage.getItem('client_token')
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
  state.is_authenticated = true
}
if (localStorage.token_get_body) state.body = localStorage.getItem('token_get_body')
if (localStorage.withdrawIds) state.withdrawIds = localStorage.getItem('withdraw_ids')
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const mutations = {
  SET_STATUS (state, status) {
    state.is_authenticated = status.status
    state.body = status.body
    state.token = status.token
    localStorage.setItem('token_get_body', status.body)
    localStorage.setItem('client_token', status.token)
  },
  LOG_OUT (state) {
    state.is_authenticated = false
    state.token = null
  },
  ADD_WITHDRAW_ID (state, withdrawsId) {
    state.withdrawIds = state.concat(withdrawsId)
    localStorage.setItem('withdraw_ids', state.withdrawIds)
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
  },
  addWithdrawId ({commit}, withdrawsId) {
    commit('ADD_WITHDRAW_ID', withdrawsId)
  }
}

const getters = {
  is_authenticated: state => state.is_authenticated,
  getToken: state => state.token,
  have_body: state => state.body && state.body.length > 0,
  withdrawIds: state => state.withdrawIds
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules,
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
