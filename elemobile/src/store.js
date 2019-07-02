import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoading: false
    },
    mutations: {
        CHANGE_IS_LOADING(state, loading) {
            state.isLoading = loading;
        }
    },
    actions: {}
})
