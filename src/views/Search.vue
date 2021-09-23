<template>
    <div class="search">
        <div class="query">
            <van-search
                v-model="searchVal"
                show-action
                placeholder="请输入搜索关键词"
                @cancel="back"  
            />


            <div v-show='searchVal'>
                <ul>
                    <!-- <li
                        v-for="data in searchCinemaData"
                        :key="data.cinemaId"
                    >{{data.name}}</li> -->
                    <Item
                        v-for="data in searchCinemaData"
                        :key="data.cinemaId"
                        :data="data"
                    ></Item>
                </ul>
            </div>
        </div>

        <!--离你最近-->
        <div v-show="!searchVal" class="distance">
            <van-list>
                <van-cell 
                    v-for="data in getCinemaListFive" 
                    :key="data.cinemaId" 
                    :title="data.name" 
                    :label="data.address"
                    :to="'/cinema/'+data.cinemaId"   
                >
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template v-slot:icon>
                        <van-icon name="smile-o" style="line-height: inherit;" />
                    </template>
                </van-cell>
            </van-list>
        </div>
    </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from "vuex"
import Vue from 'vue';
import Item from "./cinema/Item"
import { Search,List,Cell,Icon } from 'vant';
Vue.use(Search).use(List).use(Cell).use(Icon);
export default {
    components:{
        Item
    },
    data(){
        return {
            searchVal:""
        }
    },
    methods:{
        back(){
            this.$router.back()
        },
        ...mapActions("cinema",["getCinemaListAction"]),
        ...mapMutations("tabbar",["hide","show"])
    },
    computed:{
        ...mapState("cinema",["cinemaList"]),
        ...mapGetters("cinema",["getCinemaListFive"]),
        searchCinemaData(){
            return this.cinemaList.filter(item=>item.name.includes(this.searchVal)
            || item.name.toLowerCase().includes(this.searchVal.toLowerCase())) 
        },
    },
    created(){
        // this.$store.commit("tabbar/hide")
        this.hide()
        if(this.cinemaList.length === 0) { //vuex里面没有此数据
            //需要重新通过派发actions异步请求数据
            // this.$store.dispatch("cinema/getCinemaListAction")
            this.getCinemaListAction()
        }
    },
    beforeDestroy(){
        // this.$store.commit("tabbar/show")
        this.show()
    }
}
</script>

<style lang="scss" scoped>
    .distance{
        padding-left: 10px;
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                height: 30px;
                background-color: hsla(0,0%,96%,.6);
                line-height: 14px;
                border-radius: 3px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                font-size: 13px;
                padding: 8px 12px;
                margin-bottom: 10px;
                margin-right: 10px;
            }
        }
    }
</style>
