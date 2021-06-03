import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { apolloProvider } from '@/api/index'
//Vue i18n
import { i18n } from './i18n'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // or 'ant-design-vue/dist/antd.less'

Vue.config.productionTip = false

Vue.use(antd)

new Vue({
  router,
  store,
  i18n,
  // apolloProvider,
  render: h => h(App)
}).$mount('#app')
