<template>
    <div>
        center
    </div>
</template>

<script>
import {instance2} from "@/utils/http"
export default {
    created(){
        instance2({
            method:"post",
            url:"/api/user/isloginin",
        }).catch(err=>{
            //说明token失效了
            this.$router.push("/login")
        })
    }

    // beforeRouteEnter(to,from,next){
    //     instance2({
    //         method:"post",
    //         url:"/api/user/isloginin",
    //     }).then(res=>{
    //         next()
    //     }).catch(err=>{
    //         //说明token失效了
    //         next("/login")
    //     })
    // }
}
</script>

<style>

</style>
