import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import RSA from './RSA'
import AES from './AES'

export default new Vuex.Store({
  state: {
    status: 'idle'
  },
  getters: {},

  mutations: {
    SET_STATUS(state, status) {
      state.status = status
    }
  },
  actions: {},
  modules: {
    RSA,
    AES
  }
})
