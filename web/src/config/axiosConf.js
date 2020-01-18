/* eslint-disable */
import axios from 'axios'
const baseUrl = 'http://127.0.0.1:7010/library/'
// const baseUrl = 'http://192.168.72.13:7010/iobp/'
// const baseUrl = 'http://192.168.21.203:7010/iobp/'
axios.defaults.baseURL = baseUrl
export default {
  baseUrl,
  domain: '127.0.0.1'
  //domain: 'localhost'
  
}
