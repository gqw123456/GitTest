<template>
    <div class="login">
        <form @submit.prevent="login">
            <van-field v-model="username" label="用户：" placeholder="请输入用户名" />
            <van-field v-model="password" label="密码：" placeholder="请输入密码" />
            <van-button type="primary" style="width:100%;margin-top:10px;">登录</van-button>
        </form>
        <!-- <van-dialog  v-model="show" title="标题" show-cancel-button>
            <img width='100%' src="https://img.yzcdn.cn/vant/apple-3.jpg" />
        </van-dialog> -->
    </div>
</template>

<script>
import {instance2} from "@/utils/http"
import Vue from 'vue';
import { Button,Field,Dialog } from 'vant';

Vue.use(Button);
Vue.use(Field)
Vue.use(Dialog);
export default {
    data(){
        return {
            username:"",
            password:'',
            show:true
        }
    },
    methods:{
        login(){
            if(!this.username.trim() || !this.password.trim()){
                Dialog({ message: "请输入用户名或者密码！" })
                return false;
            }
            instance2.post("/api/user/loginin",{
                username:this.username,
                password:this.password
            }).then(res=>{
                localStorage.setItem("token",res.token)
                //跳转到个人中心
                this.$router.push("/center")
            }).catch(err=>{
                // console.log("login.vue-catch==>",err)
                Dialog.confirm({
                    title: '注意了！',
                    message: '登录失败了哦....',
                    confirmButtonText:"点我哦",
                    confirmButtonColor:"#ece9b5"
                })
                .then(() => {
                   console.log("点击了确定按钮...")
                })
                .catch(() => {
                    console.log("点击了取消按钮...")
                });
            })

        }
    }
}
</script>

<style lang="scss" scoped>
    .login{
        position: fixed;
        width: 100%;
        height: 200px;
        padding: 10px;
        box-sizing: border-box;
        top: 44%;
        transform: translateY(-50%);
    }
</style>
