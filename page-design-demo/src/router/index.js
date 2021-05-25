import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'design',
    component: () => import('../views/design/index.vue')
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('../views/preview/index.vue')
  },
  {
    path: '/template',
    name: 'templateManager',
    component: () => import('../views/template-manager')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
