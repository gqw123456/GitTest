<template>
    <div>
        <SwiperComp v-show='banners.length>0' cName='films-banner'>
            <div
                class="swiper-slide"
                v-for="banner in banners"
                :key="banner.bannerId"
            >
                <img :src="banner.imgUrl"/>
            </div>
        </SwiperComp>
        <nav class="nav">
            <!-- <span class="active">正在热映</span>
            <span >即将上映</span> -->
            <span
                v-for="nav in navs"
                :key="nav.id"
                :class="{active:type==nav.id}"
                @click='clickNav(nav.id)'
            >{{nav.title}}</span>
        </nav>
        <!--用来显示二级路由视图的位置-->
        <router-view></router-view>
    </div>
</template>

<script>
import Swiper from "swiper"
import SwiperComp from "@/components/Swiper"
import {instance,instance2} from "@/utils/http"
import {mapState} from "vuex"
import moment from 'moment'
// moment.locale('zh-cn');//需要汉化
export default {
    name:"Films",
    components:{
        SwiperComp  //注册轮播图组件
    },
    data(){
        return { 
            banners:[],
            type:"",
            navs:[
                {id:1,title:"正在热映"},
                {id:2,title:"即将上映"},
            ]
        }
    },
    computed:{
        ...mapState("city",["cityId"])
    },
    methods:{
        moment,
        clickNav(id){
            this.type = id
            // 切换路由
            if(id===1){
                this.$router.push("/films/nowplaying")
            }else{
                this.$router.push("/films/comingsoon")
            }
        }
    },
    //当动态组件被keep-alive包裹的时候，created只会执行一次，beforeDestroy压根不会执行！
    //所以本来写在created里面的代码，需要写入到activated
    //本来写在beforeDestroy里面的代码，需要写入到deactivated
    created(){
        console.log(moment().weekday(0).format('YYYY-MM-DD'),"moment")
        this.type = this.$route.path==="/films/comingsoon"? 2:1;
        instance.get(`/gateway?type=2&cityId=${this.cityId}&k=5992530`,{
            headers:{
                'X-Host': 'mall.cfg.common-banner'
            }
        }).then(res=>{
            if(res.data.data) this.banners = [...res.data.data,{bannerId:2,imgUrl:"https://static.maizuo.com/v5/upload/4a8da56010356705571f85b345165ed8.jpg?x-oss-process=image/quality,Q_70"}]
            this.$nextTick(()=>{ //这个方法会在updated钩子函数之后调用
                new Swiper(".films-banner",{
                    loop:true,
                    pagination:{
                        el:".swiper-pagination"
                    }
                })
            })
        })
    }
}
</script>

<!--scoped只能限制样式在当前组件可用，不会影响到子组件|插件内部的样式，如何想要影响的话，需要scoped穿透-->
<style lang="scss" scoped>
    .nav{
        height:40px;
        line-height: 40px;
        display: flex;
        justify-content: space-around;
        color:#666;
        .active{
            color:orange;
        }
    }
    .swiper-slide{
        img{
            width:100%;
            height:100%;
        }
    }
    .films-banner{
        height:2.1rem;
    }
    /deep/ .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
        bottom: 10px;
        width:40px;
        left:88%;
    }
    /deep/ .swiper-pagination-bullet-active{
        background: #fff;
    }
</style>
