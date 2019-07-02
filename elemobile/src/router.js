import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import discover from './views/discover.vue'
import order from './views/order.vue'
import profile from './views/profile.vue'
import msite from './views/msite.vue'
import shopDetails from './views/shopDetails.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',  //首页
            name: 'home',
            component: Home,
            meta:{
                isFoot:true
            }
        },
        {
            path: '/discover',  //首页
            name: 'discover',
            component: discover,
            meta:{
                isFoot:true
            }
        },
        {
            path: '/order',   //订单
            name: 'order',
            component: order,
            meta:{
                isFoot:true
            }
        },
        {
            path: '/profile',   //我的
            name: 'profile',
            component: profile,
            meta:{
                isFoot:true
            }
        },
        {
            path: '/msite/:shopTypeId',   //店铺类别
            name: 'msite',
            component: msite
        },
        {
            path:'/shopDetails/:shopId',   //店铺详情
            name:'shopDetails',
            component:shopDetails
        }
    ]
})
