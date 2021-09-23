<template>
    <div class="detailtitle">
        <i @click="back" class="iconfont icon-back"></i>
        <slot></slot>
    </div>
</template>

<script>
export default {
    methods:{
        back(){
            //当用户点击返回箭头的时候，让调用者本身来触发具体的业务逻辑 <m-title @handleBack="父组件的方法">
            this.$emit("handleback")
        }
    }
}
</script>

<style lang="scss" scoped>
    .detailtitle{
        height: .44rem;
        line-height: .44rem;
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        background: #fff;
        text-align: center;
        transition: .3s ease;
        i{
            position: absolute;
            left:0px;
        }
    }
</style>
