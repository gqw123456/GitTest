import VueRouter from "vue-router"
import Vue from "vue"
// 不要忘了调用此方法
Vue.use(VueRouter)
//路由相关的数组配置
const routes = [
    {
        path:"/films",   //path指明url地址栏输入的路径
        component:() => import('@/views/Films'),  //对应映射的路由组件
        children:[       //进行二级路由的配置（路由嵌套）
            {
                path:"/films/nowplaying", 
                component:() => import('@/views/films/NowPlaying')
            },
            {
                path:"comingsoon", //注意：二级路由前面不要加 /
                component:() => import('@/views/films/ComingSoon')
            },
            {
                path:"",
                redirect:"/films/nowplaying"
            }
        ]
    },
    {
        name:"center",
        path:"/center", 
        component:() => import(/* webpackChunkName: "center" */'@/views/Center'),  //实现了路由的懒加载（内部通过vue的异步组件+webpack的代码分割）
    },
    {
        name:"cinema",
        path:"/cinema",
        component:() => import('@/views/Cinema')
    },
    {
        path:"/cinema/search",
        component:()=>import("@/views/Search")
    },
    {
        name:"detail",
        path:"/detail/:id",
        component:() => import('@/views/Detail')
        // props:true
    },
    {
        path:"/login",
        component:()=>import('@/views/Login')
    },
    {
        path:"/city",
        component:()=>import('@/views/City')
    },
    {
        path:"/cinema/:id",
        component:()=>import("@/views/CinemaHome")
    },
    {
        path:"/Attendance",
        component:()=>import("@/views/Attendance")
    },
    {
        path:"/runningTrack",
        component:()=>import("@/views/runningTrack")
    },
    {
        path:"/openlayers",
        component:()=>import("@/views/openlayers")
    },
    {
        path:"/leaflet",
        component:()=>import("@/views/leaflet")
    },
    {
        path:"/leafletSimple",
        component:()=>import("@/views/leafletSimple")
    },
    {
        path:"/leafletExample",
        component:()=>import("@/views/leafletExample")
    },
    {
        path:"/wkdatepick",
        component:()=>import("@/views/wkdatepick")
    },
    {
        path:"/",
        redirect:"/films"  //路由的重定向  / ==> /films ==> /films/nowplaying
    },
    {
        path:"*", //匹配上面都不存在的路由 
        redirect:"/films"
    }
]

const router = new VueRouter({
    mode:"hash", 
    routes
})

//全局前置路由守卫
router.beforeEach((to,from,next)=>{
    if(to.path === "/center"){
        if(localStorage.getItem("token")){ //本地存储存在token，说明登录成功
            next()
        }else{ //说明用户没有登录
            next("/login")
        }
    }else{
        next()
    }
})

export default router
