import axios from '../util/axios.js'

export const query = (query) => axios.setAxiosGetPromise('book/', query)

export const add = (options) => axios.setAxiosPostPromise('book/', options)

export const update = (query, options) => axios.setAxiosPutPromise('book/' + query, options)

export const deleteR = (query) => axios.setAxiosDeletePromise('book/' + query)
