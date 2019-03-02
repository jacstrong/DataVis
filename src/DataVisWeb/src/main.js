import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'

import axios from 'axios'

import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.use(Vuetify)
// Add CSRF Token on every request
axios.interceptors.request.use(
  function (config) {
    config.headers = {
      'X-Requested-With': 'XMLHttpRequest',
      withCredentials: true,
      'Access-Control-Allow-Origin': '*'
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
