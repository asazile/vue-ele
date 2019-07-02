import Vue from 'vue'
import Router from 'vue-router';
import main from '@/views/main';
import admin from './admin';
import shop from './shop';
import goods from './goods';



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
      ...admin,
      ...shop,
      ...goods
  ]
  // routes: [
  //    {
  //     path:'/',
  //     name:'main',
  //     component:main
  //    }
  // ].concat(admin)
})
