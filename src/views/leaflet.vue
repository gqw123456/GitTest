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
        [40.712216, -74.22655],
        [40.732216, -74.12655],
        [40.762216, -74.17655],
        [40.742216, -74.14655],
        [40.773941, -74.12544],
      ],
      count: 0,
      marker: null,
      tractory: null,
    };
  },
  mounted() {
    this.initDate();
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
    start(){
      this.count = 0
      clearInterval(window.interval)
      window.interval = window.setInterval(()=> {
        this.showPoint();
        this.showTractory();
        this.count++;
      }, 1000); //每一秒刷新一次
    },
    test(e) {
      console.log(e, "eeee");
    },
    initDate() {
      this.map = L.map("map", {
        center: [40.02404009136253, 116.50641060224784], // 地图中心
        zoom: 14, //缩放比列
        // zoomControl: false, //禁用 + - 按钮
        // doubleClickZoom: false, // 禁用双击放大
        // attributionControl: false, // 移除右下角leaflet标识
      });

      //   this.map = L.map("map").setView([51.505, -0.09], 13);
      //   let that = this;
      //   L.tileLayer(
      //     "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      //     {
      //     //   attribution:
      //     //     'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      //       maxZoom: 18,
      //     //   id: "mapbox/streets-v11",
      //     //   tileSize: 512,
      //     //   zoomOffset: -1,
      //     //   accessToken: "your.mapbox.access.token",
      //     }
      //   ).addTo(this.map);

      //   var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
      let imageUrl = mapBg;
      let imageBounds = [
        [40.712216, -74.22655],
        [40.773941, -74.12544],
      ];
      var image = L.imageOverlay(imageUrl, imageBounds, {
        interactive: true,
      }).addTo(this.map);
      this.map.fitBounds([
        [40.712216, -74.22655],
        [40.773941, -74.12544],
      ]);

      // var osm = L.tileLayer(imageUrl, {
      //   minZoom: 10,

      //   maxZoom: 12,
      // });
      // this.map.addLayer(osm);

      var marker = L.marker([40.773941, -74.12544])
        .addTo(this.map)
        .bindPopup("<b>Hello world!</b><br />I am a popup.")
        .openPopup();

      image.on("click", function (e) {
        console.log(e, "图层点击");
        //点击地图改变marker的位置
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        marker.setLatLng([lat, lng]);
      });

      L.marker([40.742216, -74.18544])
        .addTo(this.map)
        .bindPopup("<b>阿尼呦!</b><br />I am a popup.")
        .openPopup();


      // console.log(this.map.getSize(),"getSize()返回现有地图容器的大小..")
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
    showPoint(){
        if(this.count >= this.cord.length){ //显示完全部点位后不再进行循环
            window.clearInterval(window.interval);
            this.count = 0;
            return;
        }
        if(this.marker != null){
            this.marker.remove(); //移除上一个点
        }
        this.marker = L.marker(this.cord[this.count]); //本次要显示的标记点，若要自定义标记点的样式等属性，请参考leaflet官方文档
        this.marker.addTo(this.map); //将标记点添加到地图
    },
     //运功轨迹
    showTractory(){
        if(this.count >= this.cord.length){ //显示完全部点位后不再进行循环
            window.clearInterval(window.interval);
            this.count = 0;
            return;
        }
        if(this.tractory != null){
            this.tractory.remove(); //移除上一次刷新时的轨迹
        }
        
        var tractoryData = [];
        for(var i = 0; i <= this.count; i++){ //获取轨迹坐标组
            tractoryData[i] = this.cord[i];
        }
        
        this.tractory = L.polyline(tractoryData, {color: 'red'}); //本次要显示的轨迹，并设置颜色，其他属性可以参考leaflet的官方文档
        this.tractory.addTo(this.map); //将轨迹添加到地图
    }
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 600px;
}
</style>