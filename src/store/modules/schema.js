import DefaultSchema from '../schemas'
import { getItem, setItem } from '../localStorage'

const KEY = 'SCHEMAS'

const schemas = {
  state: {
    data: getItem(KEY)
  },
  mutations: {
    ADD_SCHEMA: (state, { name, schema }) => {
      state.data[name] = schema
    },
    INIT_SCHEMA: () => {
      setItem(KEY, DefaultSchema)
    },
    CLEAR_SCHEMA: () => {
      setItem(KEY, {})
    }
  },
  actions: {
    addSchema({ commit }, view) {
      commit('ADD_SCHEMA', view)
    },
    clearSchema({ commit }) {
      commit('CLEAR_SCHEMA')
    },
    initSchema({ commit }) {
      commit('INIT_SCHEMA')
    }
  }
}

export default schemas
