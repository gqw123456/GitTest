const tabbar = {
    namespaced: true, //开启命名空间
    state:{ //用来存储多组件之间的共享状态
        isTabbarShow:true,  //用来显示tabbar
    },
    mutations:{ //里面提供了一些同步更改state的方法
        show(state){
            state.isTabbarShow = true 
        },
        hide(state){
            state.isTabbarShow = false
        },
    }
}

export default tabbar