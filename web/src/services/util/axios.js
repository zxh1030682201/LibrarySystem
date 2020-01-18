import axios from 'axios'

axios.defaults.timeout = 100000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers['Cache-Control'] = 'no-cache,no-store,must-revalidate,max-age=-1,private'
axios.defaults.fileUploadUrl = localStorage.getItem('fileUploadUrl')
axios.defaults.fileLoadUrl = localStorage.getItem('fileLoadUrl')
axios.defaults.headers.common.token = localStorage.getItem('id_token')
// 请求发送前拦截
// axios.interceptors.request.use(config => {
//   const token = localStorage.getItem('id_token')
//   config.headers.common['Authorization'] = 'Bearer ' + token
//   return config
// })

export default {
  setAxiosGetPromise: (url, params = {}) => {
    return axios.get(url, {params: params}).then(response => {
      return response
    }).catch(err => {
      throw err
    })
  },
  setAxiosPostPromise: (url, data) => {
    return axios.post(url, data).then(response => {
      return response
    }).catch(err => {
      throw err
    })
  },
  // 更新全部
  setAxiosPutPromise: (url, data) => {
    return axios.put(url, data).then(response => {
      return response
    }).catch(err => {
      throw err
    })
  },
  setAxiosDeletePromise: (url, data) => {
    return axios.delete(url, {data: data}).then(response => {
      return response
    }).catch(err => {
      throw err
    })
  }
}
