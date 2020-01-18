import services from '../../services'

const state = {
}

const actions = {
  async queryRecord ({commit}, query) {
    let record = (await services.record_query(query)).data
    return record
  },
  async queryUserRecord ({commit}, query) {
    let record = (await services.record_queryUser(query)).data
    return record
  },
  async addRecord ({commit}, options) {
    let record = await services.record_add(options)
    return record
  },
  async updateRecord ({commit}, options) {
    let record = await services.record_update(options._id, options)
    return record
  },
  async deleteRecord ({commit}, query) {
    let record = await services.record_delete(query)
    return record
  }
}

const mutations = {
}
export default {
  state,
  actions,
  mutations
}
