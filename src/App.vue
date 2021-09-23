<template>
  <div id="app">
      <!--显示对应的路由组件-->
      <transition name="app" mode="out-in">
        <router-view></router-view>
      </transition>
      <!--显示tabbar,需要根据vuex里面的isTabbarShow进行控制-->
      <Tabbar v-show='isTabbarShow'></Tabbar>
  </div>
</template>

<script>
import {mapState} from "vuex"
import Tabbar from "@/components/Tabbar"
export default {
  computed:{
    ...mapState("tabbar",["isTabbarShow"])
  },
  components:{
    Tabbar
  }
}
</script>

<style lang="scss" scoped>
  .app-enter-active{
    animation: move .66s;
  }
  .app-leave-active{
    animation: move .66s reverse;
  }

  @keyframes move{
    0%{
      transform: translateY(40px);
      opacity: 0;
    }
    100%{
      transform: translateY(0px);
      opacity: 1;
    }
  }
</style>





