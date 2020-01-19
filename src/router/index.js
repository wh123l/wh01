import Vue from 'vue'
import Router from 'vue-router'
import Login from '../view/Login'
import Home from '../view/Home'
import Welcome from '../view/Welcome'
import Introduction from '../view/film/Introduction'
import Evaluate from '../view/film/Evaluate'
import Topfilm from '../view/film/Topfilm'
import User from '../view/user/User'

Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path:'/home',
      component: Home,
      redirect:'/welcome',
      children: [
        { path:'/welcome', component: Welcome },
        {path:'/introduction', component: Introduction },
        {path:'/evaluate', component: Evaluate },
        {path:'/filmtop',component: Topfilm },
        {path:'/users',component: User },
      ]
    }
  ]
})


//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径  from 从哪个路径跳转而来  next 一个函数 表示放行
  //next（） 放行   next（'/login'）强制跳转
  if(to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('user');
    next()
  }else {
    let token = window.sessionStorage.getItem('user');
    if (!token) {
      next({path: '/login'})
    }else {
      next()
    }
  }
});

export default router
