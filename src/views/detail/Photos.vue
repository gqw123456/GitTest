<template>
    <div class="photos">
        <slot></slot>
        <ul>
            <li
                v-for="(item,index) in photo"
                :key="item"
                @click='preview(index)'
            >
                <img :src="item" alt="">
            </li>
        </ul>
    </div>
</template>

<script>

import { ImagePreview } from 'vant';
export default {
    props:["photo"],
    methods:{
        preview(index){
            // ImagePreview({
            //     images: this.photo,
            //     startPosition: index,
            // });
            this.$emit("change",index)
        },
    }
}
</script>

<style lang="scss" scoped>
    .photos{
        width: 100%;
        position: fixed;
        height: 100%;
        background: #fff;
        top: 0;
        left: 0;
        z-index: 10;
        ul{
            position: relative;
            top:50px;
            display: flex;
            flex-wrap: wrap;
            li{
                width:33.3333%;
                padding:5px;
                height:1.24rem;
            }
            img{
                width:100%;
                height:100%;
            }
        }
    }
</style>
