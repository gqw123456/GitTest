<template>
    <ul>
        <router-link
            v-for="nav in navList"
            :key="nav.id"
            :to="{
                path:nav.path   
            }"
            tag="li" 
            active-class="active"      
        >
            <i class="iconfont" :class="nav.icon"></i>
            {{nav.title}}
        </router-link>
    </ul>
</template>

<script>
export default {
    data(){
        return {
            navList:[
                {id:1,title:"电影",path:"/films",name:"films",icon:"icon-all"},
                {id:2,title:"影院",path:"/cinema",name:"cinema",icon:"icon-category"},
                {id:3,title:"我的",path:"/center",name:"center",icon:"icon-account"}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    ul{
        position: fixed;
        bottom: 0;
        left:0;
        width:100%;
        height:0.5rem;
        display: flex;
        z-index:10;
        background: #fff;
        li{
            flex:1;
            text-align: center;
            line-height: 0.25rem;
            display:flex;
            flex-direction: column;
        }
    }
    .active{
        color:orange;
    }
</style>
