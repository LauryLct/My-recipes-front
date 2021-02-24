import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import VueAxios from 'vue-axios'
import { securedAxiosInstance, plainAxiosInstance } from './backend/axios'

Vue.config.productionTip = false
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

new Vue({
  render: h => h(App),
  router,
  securedAxiosInstance,
  plainAxiosInstance
}).$mount('#app')
