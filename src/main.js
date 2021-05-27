import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

import App from './App'
import router from './router.js'

import './app.styl'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});