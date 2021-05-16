import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import loading from '@/store/modules/loading'
import adress from './modules/adress'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    loading,
    adress
  },
  getters
})

export default store
