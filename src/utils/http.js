
import axios from "axios"

//卖座相关的api接口
const instance = axios.create({
    baseURL: 'https://m.maizuo.com',
    // timeout: 5000,
    headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"159097808175630079115266","bc":"310100"}'
    }
});


//http://47.96.0.211:3000接口
const instance2 = axios.create({
    baseURL:"/info"
})


//需要在接口发送请求之前做一个拦截操作
//例如在你发送请求之前，在他的请求头上面携带一些数据传输给后端
instance2.interceptors.request.use(config=>{
    // console.log("config===>",config)
    if(localStorage.getItem("token")){ //如果token存在
        config.headers["X-Access-Token"] = localStorage.getItem("token")
    }
    return config
})




//获取后端给我们的数据做一个响应后拦截操作
instance2.interceptors.response.use(res=>{
    // console.log("response=>",res)
    if(res.data.flag){
        return res.data.data
    }else{
        return Promise.reject("出错了....")
    }
})



export {instance,instance2}   