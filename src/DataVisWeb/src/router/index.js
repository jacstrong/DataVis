import Vue from 'vue'
import Router from 'vue-router'
import SingleFamily from '@/components/SingleFamily'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SingleFamily',
      component: SingleFamily
    }
  ]
})
