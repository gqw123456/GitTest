
import {instance} from "@/utils/http"
const cinema = {
    namespaced: true, //开启命名空间
    state:{
        cinemaList:[]
    },
    getters:{  //类似于computed  与state进行关联
        getCinemaListFive(state){
            return state.cinemaList.slice(0,5)
        }
    },
    actions:{
        getCinemaListAction(context,cityId){
            instance.get(`/gateway?cityId=${cityId}&ticketFlag=1&k=6257466`,{
                headers:{
                    'X-Host': 'mall.film-ticket.cinema.list'
                }
            }).then(res=>{
                // 需要调用mutations的setCinemaList这个方法来去更改Vuex的cinemaList这个状态
                //context.commit(具体的mutations方法名字，给其传入的参数)
                context.commit("setCinemaList",res.data.data.cinemas)
            })
        }
    },
    mutations:{
        setCinemaList(state,cinemaList){  //mutations方法里面的第二个参数就是传入的值
            state.cinemaList = cinemaList
        }
    }
}
export default cinema;