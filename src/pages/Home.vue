<template>
  <div class="Home">
    
    <swiper/>
    
    <div class="home-m-l-r">
      <!-- <Cell :data="{_id:2342343,title:'啥地方',des:'撒打发斯蒂芬'}"/> -->
      <!-- <Cell :index="0" :data="{_id:2342343,title:'啥地方',des:'撒打发斯蒂芬'}"/> -->
      <Cell
        v-for="(item,index) of list"
        :key="item._id"
        :data="item"
        :index="index"
        api-name="column"
      />
    </div>
    
    
  </div>
</template>

<script>
  import swiper from '../components/swiper.vue'
  import Cell from '../components/Cell.vue'
  export default {
    name:'Home',
    props:{},
    data(){
      return {
        list:[
          {_id:1,title:'手办组合',des:'ooo1'},
          {_id:2,title:'枪械模型',des:'ooo2'},
          {_id:3,title:'生活周边',des:'ooo3'},
        ]
      }
    },
    components:{
      swiper,Cell
    },
    mounted(){},
    updated(){},
    methods:{}
  }
</script>

<style>
  .Home{
    /* background: #999999; */
  }
  .home-m-l-r{
    margin: 0 0.4rem;
  }
</style>
