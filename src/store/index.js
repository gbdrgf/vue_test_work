import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    user: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
    setUser(state, user) {
      state.user = user
    },
    clearUser(state) {
      state.user = null
    },
  },
  getters: {
    error: s => s.error,
    user: s => s.user
  },
  actions: {
  },
  modules: {
    auth
  }
})
