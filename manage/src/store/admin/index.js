import axios from "axios"
export default {
    state:{
        adminLog:[],
    },
    mutations:{
        CHANGE_ADMINLOG(state,adminLog){
            state.adminLog = adminLog
        }
    },
    actions:{
        login({commit},vm){
            axios.post("/login",vm.ruleForm).then(data=>{
                // vm.isLoading = false;
                if(data.ok===1){
                    commit("CHANGE_TOKEN",{
                        token:data.token,
                        adminName:data.adminName
                    });
                    console.log(data)
                    vm.$message({
                        message: data.msg,
                        type: 'success'
                    });
                }else {
                    vm.$message.error(data.msg);
                }
            })
        },
        adminLog({commit},obj){
            obj = obj || {};
            let pageIndex = obj.pageIndex || 1;
            axios.get("/adminLog",{
                params:{
                    pageIndex
                },
            }).then(data=>{
                commit("CHANGE_ADMINLOG",data.adminLog);
                commit("CHANGE_PAGE_INFO",{
                    total:data.total,
                    pageSize:data.pageSize
                });
            })
        },
        deleteAdmin(state,id){
            axios.delete("/deleteAdmin",{
                data:{
                    id
                }
            }).then(data=>{
                this._actions.adminLog[0](state.rootState.pageIndex);
            })
        },
    }
}