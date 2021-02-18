import axios from 'axios'

const API_URL = 'http://localhost:3000'

const securedAxiosInstance = axios.create({
  baseUrl: API_URL,
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
})

const plaindAxiosInstance = axios.create({
  baseUrl: API_URL,
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
})

securedAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase();
  if (method !== 'OPTIONS' && method !== 'GET') {
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': localStorage.csrf
    }
  }
  return config
});

securedAxiosInstance.interceptors.response.use(null, error => {
  if ( error.response && error.response.config && error.response.status === 401 ) {
    return plaindAxiosInstance.post('/refresh', {}, {headers: {'X-CSRF-TOKEN': localStorage.csrf}})
    .then(response => {
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true

      let retryConfig = error.response.config
      retryConfig.headers['X-CSRF-TOKEN'] = localStorage.csrf
      return plaindAxiosInstance.request(retryConfig)
    }).catch(error => {
      delete localStorage.csrf
      delete localStorage.signedIn

      location.replace('/')
      return Promise.reject(error)
    })
  } else {
    return Promise.reject(error)
  }
})

export { securedAxiosInstance, plaindAxiosInstance }
