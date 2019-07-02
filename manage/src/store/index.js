import Vue from 'vue'
import Vuex from 'vuex'
import admin from "./admin";
import shop from "./shop";
import goods from "./goods";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token:localStorage.token,
        isLoading:false,
        adminName:localStorage.adminName,
        total:0,  //分页总条数
        pageSize:5  //分页显示五条
    },
    mutations: {
          CHANGE_PAGE_INFO(state,{total,pageSize}){
              state.total = total;
              state.pageSize = pageSize;
          },
          OUT_LOGIN(state){
              localStorage.clear();
              state.token = localStorage.token
        },
          CHANGE_TOKEN(state,{token,adminName}){
              state.token = localStorage.token = token;
              state.adminName = localStorage.adminName = adminName;
        },
          CHANGE_IS_LOADING(state,loading){
              state.isLoading = loading;
        }
  },
    actions: {

  },
    modules:{
      admin,
      shop,
      goods
    }
})
