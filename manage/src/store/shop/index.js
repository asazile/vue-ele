import axios from "axios";
const state = {
    shopTypeList: [],
    shopList: []
}
const mutations = {
    CHANGE_SHOP_TYPE_LIST(state, shopTypeList) {
        state.shopTypeList = shopTypeList;
    },
    CHANGE_SHOP_LIST(state, shopList) {
        state.shopList = shopList;
    },
}
const actions = {
    getShopType({ commit }, obj) {
        obj = obj || {};
        let pageIndex = obj.pageIndex || 1;
        axios.get("/shopType", {
            params: {
                pageIndex
            }
        }).then(data => {
            commit("CHANGE_SHOP_TYPE_LIST", data.shopTypeList);
        })
    },
    getAllShopType({ commit }) {
        axios.get("/allShopType").then(data => {
            commit("CHANGE_SHOP_TYPE_LIST", data.shopTypeList);
        })
    },
    deleteShopType({dispatch}, id) {
        axios.delete("/deleteShopType", {
            data: {
                id
            }
        }).then(data => {
            dispatch("getShopType")
            //this._actions.getShopType[0]();
        })
    },
    getShop({ commit }, obj) {
        obj = obj || {};
        let pageIndex = obj.pageIndex || 1;
        axios.get("/shop", {
            params: {
                pageIndex
            }
        }).then(data => {
            commit("CHANGE_SHOP_LIST", data.shopList);
        })
    },
    getShopList({ commit },shopTypeId) {
        axios.get("/shopList/" + shopTypeId)
            .then(data => {
                commit("CHANGE_SHOP_LIST",data.shopList)
            })
    },
    deleteShop({dispatch}, id) {
        axios.delete("/deleteShop", {
            data: {
                id
            }
        }).then(data => {
            dispatch("getShop");
            //this._actions.getShop[0]();
        })
    },
    searchShopType({commit},shopTypeNames){
        axios.get("/searchShopType",{
            params:{
                shopTypeName:shopTypeNames
            }
        }).then(data=>{
            commit("CHANGE_SHOP_TYPE_LIST", data.shopTypeList);
        })
    },
    searchShop({commit},shopName){
        axios.get("/searchShop",{
            params:{
                shopName
            }
        }).then(data=>{
            commit("CHANGE_SHOP_LIST", data.shopList);
        })
    }
}
export default {
    state,
    mutations,
    actions
}