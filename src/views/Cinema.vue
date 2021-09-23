<template>
    <div class="cinima" v-if="cinemaList.length>0">
        <div class="title">
            <div class="left" @click="toPage('/city')">{{cityName}}</div>
            <div class="center">影院</div>
            <div class="right" @click="toPage('/cinema/search')"><i class="iconfont icon-search"></i></div>
        </div>
        <div class="select">
            <div :class="isAreaShow?'active':''" @click="isAreaShow=!isAreaShow">{{currentArea}}</div>
            <div>App订票</div>
            <div>最近去过</div>
        </div>

        <!--电影所在区域-->
        <div class="area" v-show="isAreaShow">
            <ul>
                <li 
                    v-for="data in cinemaArea"
                    :key='data'
                    @click="handleArea(data)"
                    :class="{active:data === currentArea}"
                >{{data}}</li>
            </ul>
        </div>

        <!--遍历影院数据-->
        <div class="cinemaList">
            <ul>
                <Item
                    v-for="data in filterCinemaArea"
                    :key="data.cinemaId"
                    :data="data"
                ></Item>
            </ul>
        </div>
    </div>
    <div v-else>没有数据....</div>
</template>

<script>
import {instance} from "@/utils/http"
import {mapState,mapActions,mapMutations} from "vuex"
import Item from "./cinema/Item"
export default {
    components:{
        Item
    },
    data(){
        return {
            isAreaShow:false,//是否显示区域
            currentArea:"全城" //开始的区域
        }
    },
    methods:{
        ...mapMutations('cinema',['setCinemaList']),
        //跳入指定页面
        toPage(path){
            if(path === "/city"){
                //需要将this.cinemaList长度变成0
                this.setCinemaList([])
            }
            this.$router.push(path)
        },
        //点击区域
        handleArea(area){
            this.currentArea = area //更改当前的区域
            this.isAreaShow = false //让area区域进行消失
        },
        ...mapActions("cinema",["getCinemaListAction"])
    }, 
    computed:{
        ...mapState("cinema",["cinemaList"]),  
        ...mapState("city",["cityName","cityId"]),
        cinemaArea(){
            let newarr = this.cinemaList.map(item=>{
                return item.districtName
            })
            return ["全城",...Array.from(new Set(newarr))]  //set是可以进行数组去重的，但是返回的是set对象
        },
        //点击不同区域，渲染不同的影院
        filterCinemaArea(){
            if(this.currentArea === "全城") return this.cinemaList
            return this.cinemaList.filter(item=>{
                if(item.districtName === this.currentArea){
                    return true;
                }
                return false
            })
        }
    },
    created(){
        if(this.cinemaList.length>0){ //说明vuex中有数据了

        }else{
            this.getCinemaListAction(this.cityId)
        }
    }
}
</script>
<style lang="scss" scoped>
    .title{
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        height: 40px;
        line-height: 40px;
        background: #fff;
        width: 100%;
        padding: 0 10px;
        z-index:10;
        div{
            flex:1;
        }
        .left{
            text-align: left;
        }
        .right{
            text-align: right;
        }
        .center{
            text-align: center;
        }
    }
    .select{
        position: fixed;
        top: 40px;
        background: #fff;
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        z-index:10;
        div{
            flex:1;
            text-align: center;
        }
        .active{
            color:orange;
        }
    }
    .cinemaList{
        position: relative;
        top:80px;
        // li{
        //     padding:.15rem;
        //     border-bottom:1px solid #f8f5f5;
        //     p{
        //         overflow: hidden;
        //         text-overflow: ellipsis;
        //         white-space: nowrap;
        //         width:3rem;
        //     }
        // }
    }
    .area{
        position: fixed;
        top:80px;
        left:0;
        width:100%;
        z-index:10;
        padding:10px;
        background: #fff;
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                width:22%;
                border: 1px solid rgba(210,214,220,.5);
                text-align: center;
                padding: 0.06rem 0;
                margin:0.05rem;
                &.active{
                    border: 1px solid #ff5f16;
                }
            }
        }
    }
</style>
