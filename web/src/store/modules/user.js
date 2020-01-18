import services from '../../services'

const state = {
}

const actions = {
  async queryUser ({commit}, query) {
    let res = (await services.user_query(query)).data
    return res
  },
  async addUser ({commit}, options) {
    let res = await services.user_add(options)
    return res
  },
  async updateUser ({commit}, options) {
    let res = await services.user_update(options._id, options)
    return res
  },
  async deleteUser ({commit}, query) {
    let res = await services.user_delete(query)
    return res
  },
  async login ({commit}, options) {
    let res = await services.user_login(options)
    return res
  }
}

const mutations = {
}
export default {
  state,
  actions,
  mutations
}
