import Vue from "vue"
Vue.directive("title",{
    //插入到dom之后的钩子函数
    inserted(el,binding){
        console.log(el,binding,'binding')
        el.style.opacity = 0
        window.onscroll = function(){
            let sTop = document.documentElement.scrollTop || document.body.scrollTop
            if(sTop>(binding.value || 40)){
                el.style.opacity = 1
            }else{
                el.style.opacity = 0
            }
        }
    },
    unbind(){
        window.onscroll = null
    }
})