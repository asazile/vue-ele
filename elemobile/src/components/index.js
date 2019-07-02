const components = {
    eleFoot:()=> import ("./common/eleFoot"),
    side:()=> import ("./home/side"),
    shopList:()=>import("./common/shopList"),
    loading:()=>import("./common/loading"),
    topGoods:()=>import("./shopDetails/topGoods"),
    goodsLeft:()=>import("./shopDetails/goodsLeft"),
    goodsRight:()=>import("./shopDetails/goodsRight"),
}
export default{
    install(Vue){
        for (let key in components){
            Vue.component(key,components[key]);
        }
    }
}