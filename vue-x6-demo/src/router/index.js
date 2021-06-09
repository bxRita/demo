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
    path: '/filedetail',
    name: 'filedetail',
    component: () => import('../views/filedetail/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
