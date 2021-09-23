<template>
  <div>
      <h1>datepick</h1>
    <wk-datepick @dateChange="curDate" :curDateList="dateList" />
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import Vue from "vue"
import wkDatepick from "@/components/wkdatepick/dist/datepick";
import '@/components/wkdatepick/dist/datepick/assets/style/datepick.less'
export default {
  components: {
    wkDatepick,
  },
  data() {
    return {
      dateList: [{xSummarylist: ['03:00-04:00'],xlist: [ {sid:'seaty7x7',x:'03:00 - 03:30'},{sid:'seaty7x8',x:'03:30 - 04:00'}] ,y: '星期日', yvalue:6},],
    };
  },
  created() {
    this.hide();
  },
  beforeDestroy() {
    // this.$store.commit("tabbar/show")
    this.show();
  },
  methods: {
    ...mapMutations("tabbar", ["hide", "show"]),
    curDate(val) {
      console.log(val, "val");
    },
  },
};
</script>

<style scoped lang="less">
</style>