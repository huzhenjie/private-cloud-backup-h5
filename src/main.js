import Vue from 'vue'
import App from './App.vue'
import router from '@/routers'
import store from '@/stores'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

import * as filters from '@/filters' // global filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
