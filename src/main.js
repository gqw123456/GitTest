import Vue from 'vue'
import App from './App.vue'
//引入路由实例对象
import router from "./router"
import store from "./store"
import 'leaflet/dist/leaflet.css'
// 引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import * as L from 'leaflet'
Vue.L = Vue.prototype.$L = L
/* leaflet icon */
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

Vue.config.productionTip = false

//引入main.scss文件
import "./stylesheets/main.scss"

//引入rem文件
import "./utils/rem"

//加载filters
import "./utils/filters"

//加载directives
import "./utils/directives"

//加载globalComp
import "./utils/globalComp"


new Vue({
  router, //目的 就是让组件可以访问this.$route / this.$router api.
  store,  //目的就是让组件可以访问this.$store相关的api
  render: h => h(App)
}).$mount('#app')







/*                            _ooOoo_
 *                           o8888888o
 *                           88" . "88
 *                           (| -_- |)
 *                            O\ = /O
 *                        ____/`---'\____
 *                      .   ' \\| |// `.
 *                       / \\||| : |||// \
 *                     / _||||| -:- |||||- \
 *                       | | \\\ - /// | |
 *                     | \_| ''\---/'' | |
 *                      \ .-\__ `-` ___/-. /
 *                   ___`. .' /--.--\ `. . __
 *                ."" '< `.___\_<|>_/___.' >'"".
 *               | | : `- \`.;`\ _ /`;.`/ - ` : | |
 *                 \ \ `-. \_ __\ /__ _/ .-` / /
 *         ======`-.____`-.___\_____/___.-`____.-'======
 *                            `=---='
 *
 *         .............................................
 *                  佛祖镇楼                  BUG辟易
 *          佛曰:
 *                  写字楼里写字间，写字间里程序员；
 *                  程序人员写程序，又拿程序换酒钱。
 *                  酒醒只在网上坐，酒醉还来网下眠；
 *                  酒醉酒醒日复日，网上网下年复年。
 *                  但愿老死电脑间，不愿鞠躬老板前；
 *                  奔驰宝马贵者趣，公交自行程序员。
 *                  别人笑我忒疯癫，我笑自己命太贱；
 *                  不见满街漂亮妹，哪个归得程序员？
 */
