const state = {
  token: ''
}

const mutations = {
  CHANGE_TOKEN(state, str) {
    state.token = str
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
