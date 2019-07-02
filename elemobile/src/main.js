import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import "@/iconfont/iconfont.css"
import component from "@/components/"
import axios from "axios"
import filter from "./filter"

Vue.config.productionTip = false
Vue.use(component)
Vue.prototype.$axios = axios;
Vue.use(filter);


axios.interceptors.request.use(function (config) {
    // 触发loading
    store.commit('CHANGE_IS_LOADING', true);
    return config;
}, function (err) {
    // 抛出错误
    store.commit('CHANGE_IS_LOADING', false)

})

axios.interceptors.response.use(function (data) {
    // 请求成功关闭loading
    store.commit('CHANGE_IS_LOADING', false);
    return data;
}, function (error) {
    store.commit('CHANGE_IS_LOADING', false);
})



new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
