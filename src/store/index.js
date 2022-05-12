import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null
  },
  mutations: {
    SET_LOGIN (state, payload) {
      localStorage.setItem('user', JSON.stringify(payload))
      state.user = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
