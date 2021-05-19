import Vue from 'vue'
import VueRouter from 'vue-router'
import { ModelType } from '@/config'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    children: [
      {
        path: '/modelManager',
        name: ModelType.ModelManager,
        component: () => import('../views/model-manager/index.vue')
      },
      {
        path: '/showApp',
        name: ModelType.ShowApp,
        component: () => import('../views/show-app/index.vue')
      },
      {
        path: '/resourceManager',
        name: ModelType.ResourceManager,
        component: () => import('../views/resource-manager/index.vue')
      },
      {
        path: '/buildPage',
        name: ModelType.BuildPage,
        component: () => import('../views/page-design/index.vue')
      },
      {
        path: '/buildModel',
        name: ModelType.BusinessModel,
        component: () => import('../views/build-model/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
