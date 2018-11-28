import DefaultSchema from '../schemas'
import { getItem, setItem } from '../localStorage'
import { getSchemas } from '@/api/login'

const KEY = 'SCHEMAS'

const schemas = {
  state: {
    data: getItem(KEY)
  },
  mutations: {
    ADD_SCHEMA: (state, { name, schema }) => {
      state.data[name] = schema
    },
    INIT_SCHEMA: (state, schemas) => {
      setItem(KEY, schemas)
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
    initSchema({ commit, state }) {
      return new Promise((resolve, reject) => {
        getSchemas(state.token).then(response => {
          if (!response.data) {
            reject('error')
          }
          const schemas = Object.assign(response.data, DefaultSchema)

          commit('INIT_SCHEMA', schemas)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default schemas
