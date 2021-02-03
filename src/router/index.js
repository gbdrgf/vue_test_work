import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty', publicTemplate: true},
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/table',
    name: 'table',
    meta: {layout: 'main'},
    component: () => import('@/views/Table.vue'),

  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {

  to.matched.some(record => !record.meta.publicTemplate)
      ? store.getters.user
      ? next()
      : next('/login')
      : next()

  next()
})

export default router
