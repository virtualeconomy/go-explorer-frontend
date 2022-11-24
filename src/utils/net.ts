import axios from 'axios'

  // request intercept for API
axios.interceptors.request.use(
  config => {
    config.baseURL = process.env.BASE_API_URL
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response intercept for API
axios.interceptors.response.use(
  response => {
    //todo
    return response;
  },
  err => {
    return Promise.reject(err);
  }
);
const net = {
  get(url:string, params?:object){
    return axios.get(url, params)
  },
  post(url:string, data?:object) {
    return axios.post(url, data)
  },
  delete(url:string, data?:object) {
    return axios.delete(url, { data })
  },
  put(url:string, data?:object) {
    return axios.put(url, data)
  },
  patch(url:string, data?:object) {
    return axios.patch(url, data)
  }
}

export default net
