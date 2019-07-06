const state = {
  is_authenticated: null
}

const mutations = {
  SET_STATUS (state, status) {
    state.is_authenticated = status
  }
}

const actions = {
  setAuthStatus ({commit}, status) {
    commit('SET_STATUS', status)
  }
}

const getters = {
  isAuthenticated: state => state.is_authenticated
}

export default {
  state,
  mutations,
  actions,
  getters
}
