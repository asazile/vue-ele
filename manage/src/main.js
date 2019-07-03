import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Login from "./views/Login";
import axios from "axios";
import filter from "./filter"
import component from "@/components"

router.beforeEach((to,from,next)=>{
  if(to.meta.authorization){
      if(localStorage.token) next();
      else store.commit("OUT_LOGIN");
  }else{
    next();
  }
});

axios.interceptors.request.use((config) => {
  if (localStorage.token) {
    config.headers = {
      authorization: localStorage.token
    }
  }
  store.commit("CHANGE_IS_LOADING", true)
  config.url = "/ele" + config.url;
  return config
});
axios.interceptors.response.use(({ data }) => {
  store.commit("CHANGE_PAGE_INDEX",data.pageIndex);
  store.commit("CHANGE_IS_LOADING", false);
  if(data.total && data.pageSize)
    store.commit("CHANGE_PAGE_INFO", { total: data.total, pageSize: data.pageSize });
  if(data.ok===-3)
    store.commit("OUT_LOGIN");
  return data
})

Vue.use(ElementUI);
Vue.use(filter);
Vue.use(component);
Vue.prototype.$axios = axios;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(this.$store.state.token ? App : Login) }
}).$mount('#app')
