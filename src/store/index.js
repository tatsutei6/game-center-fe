import { createStore } from 'vuex'
import ModuleUser from './user'
import ModulePlay from './play'
import ModuleRecord from './record'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: ModuleUser,
    play: ModulePlay,
    record: ModuleRecord,
  }
})
