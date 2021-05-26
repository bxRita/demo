import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { apolloProvider } from '@/api/index'

import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // or 'ant-design-vue/dist/antd.less'

Vue.config.productionTip = false

Vue.use(antd)

new Vue({
  router,
  store,
  // apolloProvider,
  render: h => h(App)
}).$mount('#app')
