export default {
    namespaced: true, //开启命名空间
    state:{
        cityName:"长沙",
        cityId:"430100"
    },
    mutations:{
        setCityName(state,name){
            state.cityName = name
        },
        setCityId(state,id){
            state.cityId = id
        }
    }
}