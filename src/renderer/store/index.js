import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  is_authenticated: false
}

state.is_authenticated = localStorage.client_token || false

const mutations = {
  CHANGE_AUTH (state, status) {
    state.is_authenticated = status
  }
}

const actions = {
  logIn ({commit}) {
    commit('CHANGE_AUTH', true)
  },
  logOut ({commit}) {
    commit('CHANGE_AUTH', false)
  }
}

const getters = {
  is_authenticated: state => state.is_authenticated
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production'
})
