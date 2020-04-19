import Vue from 'vue'
import App from './layouts/App.vue'

Vue.config.productionTip = false

//引入通用样式
import './assets/css/base.css'  // src 

//引入字体比例控制
import './assets/js/font.js'

//引入路由的配置
// import router from './plugins/router.js'




new Vue({
  render: h => h(App),
}).$mount('#app')
