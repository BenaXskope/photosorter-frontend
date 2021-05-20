import Vue from 'vue'
import Vuex from 'vuex'
import images from './images'
import directories from './directories'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    images, directories
  }
})