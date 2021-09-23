<template>
    <div class="city">
        <van-index-bar :index-list="indexList">
            <div
                v-for="(data,index) in dataList"
                :key='index'
            >
                <van-index-anchor :index="data.index" />
                <van-cell @click="clickCity(item)" v-for='(item,index) in data.list' :key='index' :title="item.name" />
            </div>
        </van-index-bar>
    </div>
</template>

<script>
import Vue from 'vue';
import { IndexBar, IndexAnchor,Cell } from 'vant';
import {mapMutations} from "vuex"
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell)

import {instance} from "@/utils/http"
export default {
    data(){
        return {
            dataList:[],
            indexList: [],
        }
    }, 
    created(){
        instance("/gateway?k=7099504",{
            headers:{
                'X-Host': 'mall.film-ticket.city.list'
            }
        }).then(res=>{
            this.filterDataList(res.data.data.cities)
        })
    },
    methods:{
        ...mapMutations("city",["setCityName","setCityId"]),
        clickCity(item){
            //修改vuex里面的共享城市名字
            this.setCityName(item.name)  
            this.setCityId(item.cityId)
            //返回上一级页面
            this.$router.back()
        },
        filterDataList(cities){
            //需要生成26个大写字母 A-Z
            let letterArr = []  //['A','B'....'Z']
            for(var i=65;i<91;i++){
                letterArr.push(String.fromCharCode(i))
            }

            let cityArr = []  //{index:'B',list:['b1','b2','b3']}
            //遍历城市，获取每个对象的pinyin的首个单词，然后跟需要的大写字母做比较，如果相同则留下
            for(var i=0;i<letterArr.length;i++){
                //获取到个根据A-Z所对应的城市，返回26个数组
                let tempArr = cities.filter(item=>item.pinyin.substring(0,1).toUpperCase() === letterArr[i])
                //如果tempArr的长度大于0，才去push
                if(tempArr.length>0){
                    cityArr.push({
                        index:letterArr[i],
                        list:tempArr
                    })
                    //往indexList里面添加符合的单词
                    this.indexList.push(letterArr[i])
                }
            }
            //给左侧需要遍历的数据进行赋值
            this.dataList = cityArr
        }
    }
}
</script>

<style>

</style>
