import Vue from "vue"
import moment from "moment"
//定义演员的过滤器
Vue.filter("actorsFilter",actors=>{
    return actors.map(item=>item.name).join(" ")
})

//定义事件过滤器
Vue.filter("filterTime",(date,options='-')=>{
    // date = new Date(date*1000)
    // return date.getFullYear() + options + (date.getMonth()+1) + options + date.getDate()
    return moment(date*1000).format("YYYY-MM-DD")
})