<template>
  <div class="Column">
    <Cell/>
    <Cell/>
    <Cell/>
    <Cell/>
  </div>
</template>

<script>
  import Cell from '../components/Cell'
  export default {
    name:'Column',
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
  .Column{
    margin-top: .6rem;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
  }
</style>
