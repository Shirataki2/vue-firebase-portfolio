import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/components/Top'
import Works from '@/components/Works'
import Diary from '@/components/Diary'
import Detail from '@/components/Detail'
import Admin from '@/components/Admin'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/works',
      name: 'Works',
      component: Works
    },
    {
      path: '/diary',
      name: 'Diary',
      component: Diary
    },
    {
      path: '/diary/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})
