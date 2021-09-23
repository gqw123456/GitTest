<template>
  <div id="map"></div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import "ol/ol.css";
import { Map, View } from "ol";
import { Projection, Transform } from "ol/proj";
import { getCenter } from "ol/extent";
import ImageLayer from "ol/layer/Image";
import ImageStatic from "ol/source/ImageStatic";
import mapBg from "@/assets/4L.jpeg";
export default {
  props: {},
  components: {
    // Head,
  },
  data() {
    return {
      map: null, // 地图
      imgx: 0, // 图片宽
      imgy: 0, // 图片高
    };
  },
  created() {
    this.hide();
  },
  beforeDestroy() {
    // this.$store.commit("tabbar/show")
    this.show();
  },
  mounted() {
    var img = new Image();
    img.src = mapBg;
    var that = this;
    img.onload = function (res) {
      // 初始化获取底图的宽高
      that.imgx = res.target.width;
      that.imgy = res.target.height;
      console.log(res,that.imgx,that.imgy,"that.imgx")
      that.initMap();
    };
  },

  methods: {
    ...mapMutations("tabbar", ["hide", "show"]),
    // 初始化地图
    initMap() {
      // 计算静态地图映射到地图上的范围
      let extent = [0, 0, this.imgx, this.imgy];
      let projection = new Projection({
        // 投影
        extent: extent,
      });

      this.map = new Map({
        target: "map",
        layers: [
          new ImageLayer({
            source: new ImageStatic({
              url: mapBg, // 加载静态地图
              imageExtent: extent, // 地图的位置
            }),
          }),
        ],
        view: new View({
          projection: projection,
          center: getCenter([0, 0, this.imgx, this.imgy]), // 获取范围的中心坐标。
          zoom: 2.0,
          //   maxZoom: 2.0,
          //   minZoom: 2.0
        }),
        // interactions: [
        //   //最初添加到映射中的交互 如未设置 使用默认交互
        //   new ol.interaction.Interaction({
        //     handleEvent,
        //   }),
        // ],
      });

      this.map.on("click", function (e) {
        console.log(e, "eeeeee");
        // console.log(this.map.getPixelFromCoordinate(e.coordinate))
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  height: 700px;
  margin-top: 20px;
}
/*隐藏ol的一些自带元素*/
// .ol-attribution,
// .ol-zoom {
//   display: none;
// }
</style>
