import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Log from '@/components/Log'
import Reg from '@/components/Reg'
// ----------------------- 店铺 ---------------------//
import Store from '../components/Management/Store'
// ----------------------- 店铺二级路由开始 ---------------------//
// ----------------------- 店铺管理 ---------------------//
import Shop from '../components/module/Shop'
// ----------------------- 商品管理 ---------------------//
import Commodity from '../components/module/Commodity/Commodity.vue'
// ----------------------- 推送管理 ---------------------//
import Push from '../components/module/Push'
// ----------------------- 订单管理 ---------------------//
import Order from '../components/module/Order'
// ----------------------- 店铺申请 ---------------------//
import Shopapply from '../components//module/Shopapply'
// ----------------------- 店铺二级路由结束 ---------------------//

// ----------------------- 管理 ---------------------//
import Permission from '../components/Management/Permission'
// ----------------------- 管理二级路由开始 ---------------------//
// ----------------------- 已通过店铺管理 ---------------------//
import information from '../components/manage/information'
// ----------------------- 未通过店铺管理 ---------------------//
import nopass from '../components/manage/nopass'
// ----------------------- 推送管理 ---------------------//
import news from '../components/manage/news'

// ----------------------- 店铺二级路由结束 ---------------------//

// 测试组件
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main

    },
    {
      path: '/log',
      name: 'Log',
      component: Log
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/Store',
      name: 'Store',
      component: Store,
      children: [
        {
          path: '/shop',
          name: 'shop',
          component: Shop
        },
        {
          path: '/Commodity',
          name: 'Commodity',
          component: Commodity
        },
        {
          path: '/Push',
          name: 'Push',
          component: Push
        },
        {
          path: '/Order',
          name: 'Order',
          component: Order
        },
        {
          path: '/Shopapply',
          name: 'Shopapply',
          component: Shopapply
        }
      ]
    },
    {
      path: '/Permission',
      name: 'Permission',
      component: Permission,
      children: [
        {
          path: '/information',
          name: 'information',
          component: information
        },
        {
          path: '/nopass',
          name: 'nopass',
          component: nopass
        },
        {
          path: '/news',
          name: 'news',
          component: news
        }
      ]
    }
  ]
})
