<template>
  <div>
    <div id="map"></div>
    <button @click="start">start</button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import mapBg from "@/assets/4L.jpeg";
// import mapBg from "@/assets/demo.jpg";
export default {
  data() {
    return {
      map: "",
      cord: [
        [200, 200],
        [400, 500],
        [600, 600],
        [500, 700],
        [700, 800],
        [1000,900]
      ],
      imgx: null,
      imgy: null,
      count: 0,
      marker: null,
      tractory: null,
    };
  },
  mounted() {
    var img = new Image();
    img.src = mapBg;
    var that = this;
    img.onload = function (res) {
      // 初始化获取底图的宽高
      that.imgx = res.target.width;
      that.imgy = res.target.height;
      console.log(res, that.imgx, that.imgy, "that.imgx");
      that.initDate();
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
    start() {
      this.count = 0;
      clearInterval(window.interval);
      window.interval = window.setInterval(() => {
        this.showPoint();
        this.showTractory();
        this.count++;
      }, 1000); //每一秒刷新一次
    },
    xy(x, y) {
      var yx = L.latLng;
      if (L.Util.isArray(x)) {
        // When doing xy([x, y]);
        return yx(x[1], x[0]);
      }
      return yx(y, x);
    },
    test(e) {
      console.log(e, "eeee");
    },
    initDate() {
      L.CRS.Simple.transformation = new L.Transformation(1, 0, 1, 0);
      let that = this;
      this.map = L.map("map", {
        center: [0, 0], // 获取范围的中心坐标。
        zoom: 2, //缩放比列
        minZoom: -5,
        maxZoom: 4,
        crs: L.CRS.Simple,
        // scrollWheelZoom: false,
        // dragging: false,
        zoomControl: false, //禁用 + - 按钮
        doubleClickZoom: false, // 禁用双击放大
        attributionControl: false, // 移除右下角leaflet标识
      });

      let imageUrl = mapBg;
      let imageBounds = [
        [0, 0],
        [this.imgy, this.imgx],
      ];

      var image = L.imageOverlay(imageUrl, imageBounds, {
        interactive: true,
      }).addTo(this.map);
      // image.bringToFront()
      this.map.fitBounds(imageBounds);

      //   this.map.setMaxBounds(imageBounds);

      // var marker = L.marker(this.map.layerPointToLatLng([2000, 1820]))
      //   .addTo(this.map)
      //   .bindPopup("<b>Hello world!</b><br />I am a popup.")
      //   .openPopup();

      var marker = L.marker(this.xy(1000,909))
        .addTo(this.map)
        .bindPopup("<b>Hello world!</b><br />I am a popup.")
        .openPopup();

      var sol = this.map.unproject([3000, 600]);
      L.marker(sol)
        .addTo(this.map)
        .bindPopup("<b>i am jisoo!</b>.")
        .openPopup();

      image.on("click", function (e) {
        let that = this;
        console.log(e, "图层点击");
        //点击地图改变marker的位置
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        marker.setLatLng([lat, lng]);
        var x = e.layerPoint.x;
        var y = e.layerPoint.y;
        console.log([x, y]);
        var pointXY = L.point(x, y);
        console.log("Point in x,y space: " + pointXY);
      });
      this.map.on("click", function (e) {
        console.log(e, "底图点击");
      });

      //   L.marker([40.742216, -74.18544])
      //     .addTo(this.map)
      //     .bindPopup("<b>阿尼呦!</b><br />I am a popup.")
      //     .openPopup();

      // console.log(this.map.getSize(),"getSize()返回现有地图容器的大小..")
      console.log(
        this.map.layerPointToLatLng([712, 447]),
        this.map.getCenter([0, 0, this.imgx, this.imgy]),
        "getCenter()返回地图视图的中心."
      );
      console.log(this.map.getBounds(), "getBounds()返回地图视图的经纬度边界.");
      console.log(
        this.map.getPixelBounds(),
        "getPixelBounds()返回地图视图在像素投影坐标系下的边界."
      );
      console.log(
        this.map.getPixelOrigin(),
        "getPixelOrigin()返回地图图层像素投影坐标系下的左上角的点."
      );
    },
    //动态显示标记点
    showPoint() {
      if (this.count >= this.cord.length) {
        //显示完全部点位后不再进行循环
        window.clearInterval(window.interval);
        this.count = 0;
        return;
      }
      if (this.marker != null) {
        this.marker.remove(); //移除上一个点
      }
      this.marker = L.marker(this.xy(this.cord[this.count])); //本次要显示的标记点，若要自定义标记点的样式等属性，请参考leaflet官方文档
      this.marker.addTo(this.map); //将标记点添加到地图
    },
    //运功轨迹
    showTractory() {
      if (this.count >= this.cord.length) {
        //显示完全部点位后不再进行循环
        window.clearInterval(window.interval);
        this.count = 0;
        return;
      }
      if (this.tractory != null) {
        this.tractory.remove(); //移除上一次刷新时的轨迹
      }

      var tractoryData = [];
      for (var i = 0; i <= this.count; i++) {
        //获取轨迹坐标组
        tractoryData[i] = this.xy(this.cord[i]) 
      }

      this.tractory = L.polyline(tractoryData, { color: "red" }); //本次要显示的轨迹，并设置颜色，其他属性可以参考leaflet的官方文档
      this.tractory.addTo(this.map); //将轨迹添加到地图
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 40%;
  height: 600px;
  margin-left: 200px;
}
</style>