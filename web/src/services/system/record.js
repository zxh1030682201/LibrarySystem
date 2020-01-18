import axios from '../util/axios.js'

export const query = (query) => axios.setAxiosGetPromise('record/', query)

export const queryUser = (query) => axios.setAxiosGetPromise('record/user', query)

export const add = (options) => axios.setAxiosPostPromise('record/', options)

export const update = (query, options) => axios.setAxiosPutPromise('record/' + query, options)

export const deleteR = (query) => axios.setAxiosDeletePromise('record/' + query)
