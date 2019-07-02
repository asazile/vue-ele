import axios from "axios";

const state = {
    goodsTypeList: [],
    addGoodsTypeList:[],
    goodsList: []

}
const mutations = {
    CHANGE_GOODS_TYPE_LIST(state, goodsTypeList) {
        state.goodsTypeList = goodsTypeList;
    },
    CHANGE_ADD_GOODS_TYPE_LIST(state, addGoodsTypeList) {
        state.addGoodsTypeList = addGoodsTypeList;
    },
    CHANGE_GOODS_LIST(state, goodsList) {
        state.goodsList = goodsList;
    }
}
const actions = {
    getGoodsType({commit}, obj) {
        obj = obj || {};
        let pageIndex = obj.pageIndex || 1;
        axios.get("/goodsType", {
            params: {
                pageIndex
            }
        }).then(data => {
            commit("CHANGE_GOODS_TYPE_LIST", data.goodsTypeList);
        })
    },
    deleteGoodsType({dispatch}, id) {
        axios.delete("/deleteGoodsType", {
            data: {
                id
            }
        }).then(data => {
            dispatch("getGoodsType");
            //this._actions.getGoodsType[0]();
        })
    },
    getAllGoodsType({commit}) {
        axios.get("/allGoodsType").then(data => {
            commit("CHANGE_GOODS_TYPE_LIST", data.goodsTypeList);
        })
    },
    getGoods({commit}, obj) {
        obj = obj || {};
        let pageIndex = obj.pageIndex || 1;
        axios.get("/goods", {
            params: {
                pageIndex
            }
        }).then(data => {
            commit("CHANGE_GOODS_LIST", data.goodsList);
        })
    },
    getGoodsTypeList({commit}, shopId) {
        axios.get("/goodsTypeList/" + shopId)
            .then(data => {
                commit("CHANGE_ADD_GOODS_TYPE_LIST", data.goodsTypeList)
            })
    },
    deleteGoods({dispatch}, id) {
        axios.delete("/deleteGoods", {
            data: {
                id
            }
        }).then(data => {
            dispatch("getGoods");
            // this._actions.getGoods[0]();
        })
    },
    searchGoodsType({commit},goodsTypeName){
        axios.get("/searchGoodsType",{
            params:{
                goodsTypeName
            }
        }).then(data=>{
            commit("CHANGE_GOODS_TYPE_LIST", data.goodsTypeList);
        })
    },
    searchGoods({commit},goodsName){
        axios.get("/searchGoods",{
            params:{
                goodsName
            }
        }).then(data=>{
            commit("CHANGE_GOODS_LIST", data.goodsList);
        })
    }
}
export default {
    state,
    mutations,
    actions
}