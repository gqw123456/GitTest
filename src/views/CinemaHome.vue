<template>
    <div>
        影院.....
    </div>
</template>

<script>
import {instance} from "@/utils/http"
export default {
    created(){
        instance("/gateway/?cinemaId="+this.$route.params.id+"&k=5868567",{
            headers:{
                'X-Host': 'mall.film-ticket.cinema.info'
            }
        }).then(res=>{
            console.log(res)
        })
        instance("/gateway/?cinemaId="+this.$route.params.id+"&k=5868567",{
            headers:{
                'X-Host': 'mall.film-ticket.film.cinema-show-film'
            }
        }).then(res=>{
            console.log(res)
        })
    }
}
</script>

<style>

</style>
