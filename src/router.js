import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ArticleDetails from './views/Article/ArticleDetails.vue'
import ArticleSort from './views/Article/ArticleSort.vue'
import GoodsList from './views/Goods/GoodsList.vue'
import GoodsDetails from './views/Goods/GoodsDetails.vue'
import User from './views/User/User.vue'
import Login from './views/User/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },

    // 文章块
    {
      path: '/articleSort',
      name: 'articleSort',
      component: ArticleSort
    },
    {
      path: '/article',
      name: 'articleList',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Article/ArticleList.vue')
    },
    {
      path: '/ArticleDetails/:sid',
      name: 'articleDetails',
      component: ArticleDetails
    },

    // 商品块
    {
      path: '/GoodsList',
      name: 'goodsList',
      component: GoodsList
    },
    {
      path: '/GoodsDetails/:id',
      name: 'goodsDetails',
      component: GoodsDetails
    },

    // 个人中心块
    {
      path: '/User',
      name: 'user',
      component: User
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },

    {
      path: '/',
      // name: 'home',
      redirect:'/home'   //重定向
    },
  ]
})
