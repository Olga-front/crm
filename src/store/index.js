import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    error: state => state.error
  },
  actions: {
    async fetchCurrency () {
      const res = { base: 'EUR', date: new Date(), rates: { USD: 1.055432, EUR: 1, PLN: 4.667462 } }
      return res
    }
  },
  modules: {
    auth,
    info,
    category,
    record
  }
})
