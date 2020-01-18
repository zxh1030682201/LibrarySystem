import services from '../../services'

const state = {
}
/*eslint-disable*/
const actions = {
  async queryBook ({commit}, query) {
    let res = (await services.book_query(query)).data
    return res
  },
  async addBook ({commit}, options) {
    let res = await services.book_add(options)
    return res
  },
  async updateBook ({commit}, options) {
    let res = await services.book_update(options._id, options)
    return res
  },
  async deleteBook ({commit}, query) {
    let res = await services.book_delete(query)
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
