import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'
import about from '@/components/about'
import info from '@/components/info'
import member from '@/components/member'
import market from '@/components/market'
import loginRegister from '@/components/loginRegister'
import notFound from '@/components/404'

Vue.use(Router)

const router = new Router({
  routes: [...home, ...info, ...member, ...market, ...loginRegister, ...about, {
    path: '*',
    component: notFound
  }],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

//路由跳转前处理
router.beforeEach(function (to, from, next) {
  if (to.fullPath == "/login") {
    next({
      path: "/login",
      query: { redirect: from.fullPath }
    })
  } else {
    next();
  }
});

export default router
