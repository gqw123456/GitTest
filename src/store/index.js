import Vue from "vue"
import Vuex from "vuex"
import cinema from "./module/cinema"
import tabbar from "./module/tabbar"
import city from "./module/city"
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)  
//创建store仓库
let store = new Vuex.Store({
    plugins:[createPersistedState({
        reducer(data){
            return {
                city:data.city  //只需要让本地存储存储vuex中的city相关的数据
            }
        }
    })],
    modules:{
        cinema,
        tabbar,
        city
    }
})

export default store;