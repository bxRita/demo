import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { apolloProvider } from '@/api/index'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // or 'ant-design-vue/dist/antd.less'

import PageDesign from 'page-design-demo'
import 'page-design-demo/lib/pagedesign.css'

import BuildModel from 'vue-x6-demo'
import 'vue-x6-demo/lib/buildmodel.css'
Vue.use(PageDesign)
Vue.use(BuildModel)

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
