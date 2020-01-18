import axios from '../util/axios.js'

export const query = (query) => axios.setAxiosGetPromise('user/', query)

export const add = (options) => axios.setAxiosPostPromise('user/', options)

export const update = (query, options) => axios.setAxiosPutPromise('user/' + query, options)

export const deleteR = (query) => axios.setAxiosDeletePromise('user/' + query)

export const login = (options) => axios.setAxiosPostPromise('login/', options)
