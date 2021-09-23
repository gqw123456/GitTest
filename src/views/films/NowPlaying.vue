<template>
    <div>
        正在热映
        <ul>
            <router-link
                tag="li"
                v-for="data in datalist"
                :key="data.filmId"
                :to="'/detail/'+data.filmId"
            >
                <img :src="data.poster" alt="">
                <div class="content">
                    <h4>{{data.name}}</h4>
                    <p>观众评分：<span style="color: #ffb232;font-size: 14px;">{{data.grade}}</span></p>
                    <!-- <p class="actiors">主演：<span v-for="item in data.actors" :key='item.name'>{{item.name}}</span></p> -->
                    <p class="actors">主演： {{data.actors | actorsFilter}}</p>
                    <p>{{data.nation}} </p>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
import {instance} from "@/utils/http"
import {mapState} from "vuex"
export default {
    data(){
        return {
            datalist:[]
        }
    },
    computed:{
        ...mapState("city",["cityId"])
    },
    created(){
        //请求正在热映的数据
        instance.get(`/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=1414009`,{
            headers:{
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res=>{
            this.datalist = res.data.data.films
        })
    }
}
</script>

<style lang="scss" scoped>
    li{
        padding:10px;
        display: flex;
        img{
            width:0.66rem;
            height:0.9rem;
        }
        .content{
            display: flex;
            flex-direction: column;
            margin-left:10px;
            h4{
                color: #191a1b;
                font-size: 16px;
            }
            .actors{
                width:2.4rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>
