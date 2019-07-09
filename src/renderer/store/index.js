import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  is_authenticated: false
}

state.is_authenticated = localStorage.client_token || false

const mutations = {
  CHANGE_AUTH (state) {
    state.is_authenticated = !state.is_authenticated
  }
}

const actions = {
  logIn ({commit}) {
    commit('CHANGE_AUTH')
  },
  logOut ({commit}) {
    commit('CHANGE_AUTH')
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
