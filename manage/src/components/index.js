// import pageInfo from "./common/pageInfo";
// import addShopType from "./shop/addShopType";
// export default{
//   install(Vue){
//     Vue.component("pageInfo",pageInfo);
//     Vue.component("addShopType",addShopType);
//   }
// }


const components = {
  pageInfo:()=> import ("./common/pageInfo"),
  addShopType:()=> import ("./shop/addShopType"),
  addShop:()=> import ("./shop/addShop"),
  addGoodsType:()=> import ("./goods/addGoodsType"),
  addGoods:()=> import ("./goods/addGoods"),
}
export default{
  install(Vue){
    for (let key in components){
        Vue.component(key,components[key]);
    }
  }
}