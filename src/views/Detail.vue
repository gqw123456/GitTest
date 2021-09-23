<template>
   <div style="padding-bottom:50px;">
        <div class="detail" v-if="filmInfo">
            <!-- <div class="detailtitle" v-title>
                <i class="iconfont icon-back"></i>
                <span>急先锋</span>
            </div> -->
            
            <!--直接引用全局组件m-title-->
            <m-title @handleback="goBack" v-title>
                <span>{{filmInfo.name}}</span>    
            </m-title> 

            <img width='100%' :src="filmInfo.poster" alt="">
            <div class="filmInfo-con">
                <h4>{{filmInfo.name}} <span class='item'>{{filmInfo.filmType.name}}</span></h4>
                <p>{{filmInfo.category}}</p>
                <p>{{filmInfo.premiereAt | filterTime}} 上映</p>
                <p class="grade">{{filmInfo.grade}}</p>
                <p style="height:150px;transition:all .5s ease;overflow:hidden" :class="{'hidden':synopsis}">{{filmInfo.synopsis}}</p>
                <i @click="synopsis=!synopsis" class="iconfont" :class="synopsis?'icon-moreunfold':'icon-less'"></i>
                <h4>演职人员：</h4>
                <SwiperComp cName="actors">
                    <div 
                        class="swiper-slide"
                        v-for="data in filmInfo.actors"
                        :key="data.name"
                    >
                        <div>
                            <img class="actor-img" :src="data.avatarAddress" alt="">
                        </div>
                    </div>
                </SwiperComp>
                <h4 @click="isShow=true">剧照：</h4>
                <SwiperComp cName="photos">
                    <div 
                        class="swiper-slide"
                        v-for="(data,index) in filmInfo.photos"
                        :key="index"
                        @click='preview(index)'
                    >
                        <div>
                            <img class="photos-img" :src="data" alt="">
                        </div>
                    </div>
                </SwiperComp>
            </div>
 
            <!--调用photos组件-->
            <Photos @change='preview' v-show="isShow" :photo="filmInfo.photos">
                <m-title @handleback="back">剧照（{{filmInfo.photos.length}}）</m-title>
            </Photos>
        </div>
        <img v-else width='100%' src="../assets/loading.jpg" alt="">
   </div>
</template>

<script>
import {instance} from "@/utils/http"
import SwiperComp from "@/components/Swiper"
import Swiper from "swiper"
import Photos from "./detail/Photos"

import { ImagePreview } from 'vant';
export default {
    components:{
        SwiperComp,Photos
    },
    methods:{
        preview(index){
            ImagePreview({
                images: this.filmInfo.photos,
                startPosition: index,
                closeable: true,
                closeIconPosition:"top-left",
                closeIcon:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591784945999&di=543639c628ccff74649df798b1139073&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F18%2F01%2F13%2F43c1ab4f9188e177ab2ef0c38e0c2e92.jpg%2521%2Ffwfh%2F804x560%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue"
            });
        },
        goBack(){
            this.$router.back()
        },
        back(){
            this.isShow = false
        }
    },
    data(){
        return {
            filmInfo:null,
            synopsis:false,
            isShow:false
        }
    },
    created(){
        instance.get(`/gateway?filmId=${this.$route.params.id}&k=502424`,{
            headers:{
                'X-Host': 'mall.film-ticket.film.info'
            }
        }).then(res=>{
            this.filmInfo = res.data.data.film
            this.$nextTick(()=>{
                new Swiper('.actors',{
                    slidesPerView: 3.8,
                    spaceBetween: 10,
                })
                new Swiper('.photos',{
                    slidesPerView: 2.3,
                    spaceBetween: 10,
                })
            })
        })
    },
}
</script>

<style lang="scss" scoped>
    // .detailtitle{
    //     height: .44rem;
    //     line-height: .44rem;
    //     width: 100%;
    //     position: fixed;
    //     left: 0;
    //     top: 0;
    //     z-index: 10;
    //     background: #fff;
    //     text-align: center;
    //     transition: .3s ease;
    //     i{
    //         position: absolute;
    //         left:0px;
    //     }
    // }
    .actor-img{
        width:100%;
        height:1.08rem;
        position: relative;
        top: -16px;
    }
    .photos-img{
        width:100%;
    }
    .filmInfo-con{
        padding:0.12rem .15rem .15rem;
        position: relative;
        .item{
            font-size: 9px;
            color: #fff;
            background-color: #d2d6dc;
            height: 14px;
            line-height: 14px;
            padding: 0 2px;
            border-radius: 2px;
            display: inline-block;
        }
        h4{
            color: #191a1b;
            font-size: 18px;
        }
        .grade{
            position: absolute;
            right:17px;
            top:22px;
            color: #ffb232;
            font-size: 18px;
        }
        i{
            position: absolute;
            left:50%;
            transform: translateX(-50%);
        }
        .hidden{
            height: 38px!important;
            background: #d7d7d7;
        }
    }
</style>
