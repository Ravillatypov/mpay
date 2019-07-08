const state = {
  withdrawIds: []
}
if (localStorage.withdrawIds) state.withdrawIds = localStorage.getItem('withdraw_ids')
const mutations = {
  ADD_WITHDRAW_ID (state, withdrawsId) {
    state.withdrawIds = state.concat(withdrawsId)
    localStorage.setItem('withdraw_ids', state.withdrawIds)
  }
}

const actions = {
  addWithdrawId ({commit}, withdrawsId) {
    commit('ADD_WITHDRAW_ID', withdrawsId)
  }
}

const getters = {
  withdrawIds: state => state.withdrawIds
}

export default {
  state,
  mutations,
  actions,
  getters
}
