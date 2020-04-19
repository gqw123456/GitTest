<template>
  <div class="Follow">
    <Cell/>
    <Cell/>
    <Cell/>
    <Cell/>
  </div>
</template>

<script>
  import Cell from '../components/Cell.vue'
  export default {
    name:'Follow',
    props:{},
    data(){
      return {
        
      }
    },
    components:{
      Cell
    },
    mounted(){},
    updated(){},
    methods:{}
  }
</script>

<style>
  .Follow{
    margin-top: .6rem;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
  }
</style>
