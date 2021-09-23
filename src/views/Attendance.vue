<template>
  <!-- attendance -->
  <div class="container">
    <!-- <div class="head"><Head /></div>
    <div id="box"></div>
    <div class="leftBox">
      <div class="Img">
        <img
          src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3821171310,2828217812&fm=26&gp=0.jpg"
          alt=""
          class="touxiang"
        />
      </div>
      <div class="form">
        <p>
          <label>姓名<input v-model="person.name" /> </label>
        </p>
        <p>
          <label>部门<input v-model="person.department" /> </label>
        </p>
        <p>
          <label>桌号<input v-model="person.table" /> </label>
        </p>
      </div>
    </div> -->
    <div class="conten">
      <div class="contenTop">
        <h2>
           {{message}}<br />
          座位号已经同步发送到您预留的手机中 请注意查收
        </h2>
        <h3><span></span>您当前所在位置</h3>
      </div>
      <div class="contenBottom">
        <div class="stage">舞台</div>
        <div class="areaImg" ref="chartElement">
          <canvas
            id="Canvas"
            width="1200px"
            height="350px"
            ref="canvas"
          ></canvas>
          <div class="xuanzhun" id="tableBox1">
            <span id="table1">01号桌</span>
          </div>
          <div class="xuanzhun" id="tableBox2">
            <span id="table2">02号桌</span>
          </div>
          <div class="xuanzhun" id="tableBox3">
            <span id="table3">03号桌</span>
          </div>
          <div class="xuanzhun" id="tableBox4">
            <span id="table4">04号桌</span>
          </div>
          <div class="xuanzhun" id="tableBox5">
            <span id="table5">05号桌</span>
          </div>
          <div class="xuanzhun" id="tableBox6">
            <span id="table6">06号桌</span>
          </div>
          <div class="xuanzhun" id="tableBox7">
            <span id="table7">07号桌</span>
          </div>
          <div class="xuanzhun" id="tableBox8">
            <span id="table8">08号桌</span>
          </div>
          <div class="xuanzhun" id="tableBox9">
            <span id="table9">09号桌</span>
          </div>
          <div class="xuanzhun" id="tableBox10">
            <span id="table10">10号桌</span>
          </div>
        </div>
        <div class="entrance">年会厅入口处</div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import {mapActions,mapMutations} from "vuex"
// 餐桌坐标点标记
import { canConfig } from "../utils/coordinate";
// import { init } from "./move";
// import Head from "./Head";
export default {
  props: {},
  components: {
    // Head,
  },
  data() {
    return {
      person: {},
      demo: {},
      // 桌子
      tableImage: "",
      message: "12",
    };
  },
  created() {
    this.hide()
  },
  beforeDestroy(){
        // this.$store.commit("tabbar/show")
        this.show()
    },
  mounted() {
    this.person = this.$route.params.info;
    this.person = {
      // 1是vip ， 0不是
      is_vip: "1",
      // 1是第一次，0表示已经签到过
      first_sign: 0,
      name: "lwq",
      position: "工程师",
      department: "开发部",
      table: 2,
      width: 500,
      height: 200,
      image:
        "http://5b0988e595225.cdn.sohucs.com/images/20190620/d1b33c436a8846c396331c3e75838c03.JPG",
    };
    if (this.person.first_sign) {
      console.log(this.message)
      this.message = "欢迎您参加年会 请按引导指示入座";
    } else {
      this.message = "您已签到，请勿重复签到";
    }
    let str = `table${this.person.table}`;
    var box = `tableBox${this.person.table}`;
    var tablee = document.getElementById(str);
    var tableBox = document.getElementById(box);
    tableBox.style.border = "5px dotted #FD724D";
    tablee.style.background = "#FD724D";
    this.canvas();
  },

  methods: {
    ...mapMutations("tabbar",["hide","show"]),
    // 语音播报
    Broadcast() {
      let broadText = document.getElementsByClassName("sorry")[0].innerHTML;
      var box = document.getElementById("box");
      var Audio = document.getElementById("autio_id");
      var str = `<audio id="autio_id" autoplay="autoplay">
                      <source src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=${broadText}" type="audio/mpeg">
		         </audio>
             `;
      box.innerHTML = str;
      var playPromise = Audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            Audio.pause();
          })
          .catch((error) => {});
      }
    },
    // 加载路线
    canvas() {
      const self = this;
      const myCanvas = this.$refs.canvas;

      if (myCanvas.getContext) {
        var ctx = myCanvas.getContext("2d");
        ctx.strokeStyle = "#FD724D"; // 路线样式
        ctx.shadowBlur = 10;
        ctx.lineWidth = 4;
        canConfig.forEach((item) => {
          if (item.id == self.person.table) {
            var canvs = item.list;

            let timer = 0;
            let points = []; //已经运动过的数据
            let animatePoint = [0, 0]; //当前运动点位置
            let nextPointIndex = 1; //下一个运动点的index
            let startTime;

            init(canvs); // 开始运动

            function init(canvs) {
              ctx.clearRect(0, 0, myCanvas.clientWidth, myCanvas.clientHeight);
              if (canvs.length > 0) {
                points.push([canvs[0][0], canvs[0][1]]);
                animatePoint = [canvs[0][0], canvs[0][1]];
                drawPoint(canvs[0][0], canvs[0][1]);
              }

              // 需要运动
              canvs.length > 1 && startTimer();
            }
            function startTimer() {
              startTime = new Date().getTime();
              if (canvs.length > 1) {
                clearTimer();
                animate();
              }
            }

            function clearTimer() {
              window.cancelAnimationFrame(timer);
            }

            function animate() {
              // window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，
              // 并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，
              // 该回调函数会在浏览器下一次重绘之前执行
              timer = window.requestAnimationFrame(animate);
              startMove();
            }

            function startMove() {
              // 目标距离
              let targetDistance = Math.sqrt(
                Math.pow(
                  canvs[nextPointIndex - 1][0] - canvs[nextPointIndex][0],
                  2
                ) +
                  Math.pow(
                    canvs[nextPointIndex - 1][1] - canvs[nextPointIndex][1],
                    2
                  )
              );
              // 运动距离
              let currentDistance = Math.sqrt(
                Math.pow(canvs[nextPointIndex - 1][0] - animatePoint[0], 2) +
                  Math.pow(canvs[nextPointIndex - 1][1] - animatePoint[1], 2)
              );
              if (currentDistance >= targetDistance) {
                //利用运动距离与目标距离, 判断运动的点是否超过下一个目标点, 超过了就重置下一个点
                startTime = new Date().getTime();
                // 运动点的位置
                points[nextPointIndex] = [
                  canvs[nextPointIndex][0],
                  canvs[nextPointIndex][1],
                ];
                // 当前运动点位置
                animatePoint = [
                  canvs[nextPointIndex][0],
                  canvs[nextPointIndex][1],
                ];

                nextPointIndex++;

                clearTimer();
                if (nextPointIndex <= canvs.length - 1) {
                  setTimeout(() => {
                    startTimer();
                  }, 500);//停顿效果
                }

                //重绘
                ctx.clearRect(
                  0,
                  0,
                  myCanvas.clientWidth,
                  myCanvas.clientHeight
                );
                drawPolygon(points);
                drawPoint(animatePoint[0], animatePoint[1], "yellow");
                return;
              }

              if (nextPointIndex > canvs.length - 1) {
                //轨迹运动结束后, 关闭timer
                clearTimer();

                animatePoint = [
                  canvs[canvs.length - 1][0],
                  canvs[canvs.length - 1][1],
                ];
              } else {
                let speed = 0.25;

                let deltaTime = new Date().getTime() - startTime;
                let deltaDistance = deltaTime * speed;
                let rate = deltaDistance / targetDistance;
                let x =
                  canvs[nextPointIndex - 1][0] +
                  (canvs[nextPointIndex][0] - canvs[nextPointIndex - 1][0]) *
                    rate;
                let y =
                  canvs[nextPointIndex - 1][1] +
                  (canvs[nextPointIndex][1] - canvs[nextPointIndex - 1][1]) *
                    rate;

                animatePoint[0] = x;
                animatePoint[1] = y;

                //重绘, 将animatePoint设为轨迹的下一个点, 以达到动态的效果
                points[nextPointIndex] = [animatePoint[0], animatePoint[1]];
                ctx.clearRect(
                  0,
                  0,
                  myCanvas.clientWidth,
                  myCanvas.clientHeight
                );
                drawPolygon(points);
                drawPoint(animatePoint[0], animatePoint[1], "yellow");
              }
            }

            function drawPoint(x, y, color) {
              //绘制点
              ctx.fillStyle = "#ccc";
              ctx.beginPath();
              ctx.arc(x, y, 5, Math.PI * 2, 0, true);
              ctx.closePath();
              ctx.stroke();
              ctx.fill();
            }
            function drawPolygon(points) {
              //绘制轨迹
              ctx.clearRect(0, 0, myCanvas.clientWidth, myCanvas.clientHeight);

              ctx.beginPath();
              ctx.moveTo(points[0][0], points[0][1]);
              let i = 1,
                len = points.length;
              for (; i < len; i++) {
                ctx.lineTo(points[i][0], points[i][1]);
              }
              ctx.stroke();

              let j = 0;
              for (; j < len - 1; j++) {
                drawPoint(points[j][0], points[j][1]);
              }
            }
          }
        });
        ctx.strokeWidth = 5; // 设置绘制线条的宽度
        ctx.stroke();
        ctx.closePath(); // 关闭绘制路径
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#Canvas {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
}
.areaImg {
  width: 1200px;
  height: 350px;
  margin-top: 20px;
  margin-left: 50px;
  // background: aqua;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  position: absolute;
  left: 0;
  top: 250px;
}
.container {
  background: url(/static/guide/bg.png) no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
}
input {
  background: none;
  border: none;
  text-indent: 1em;
}
.leftBox {
  margin-left: 40px;
  padding-top: 88px;
  width: 30%;
  height: 732px;
  background: rgba(0, 12, 63, 0.5);
  float: left;
  > .form {
    z-index: 10;
    color: white;
    padding-left: 61px;
    font-size: 32px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: #ffffff;
  }
}
.Img {
  margin-bottom: 69px;
  display: flex;
  justify-content: center;
}
.touxiang {
  display: block;
  width: 178px;
  height: 237px;
}
.conten {
  margin-left: 40px;
  float: left;
  padding: 40px;
  // width: 65%;
  width: 92%;
  height: 732px;
  color: white;
  background: rgba(0, 12, 63, 0.5);
  position: relative;
  > .contenTop {
    display: flex;
    justify-content: space-between;
    > h2 {
      width: 628px;
      height: 66px;
      font-size: 20px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 30px;
      float: left;
    }
    > h3 {
      width: 195px;
      height: 26px;
      font-size: 20px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: #ffffff;
      float: right;
      line-height: 26px;
      > span {
        display: inline-block;
        width: 22px;
        height: 22px;
        background: #fd724d;
        border-radius: 50%;
        margin-right: 5px;
        line-height: 26px;
      }
    }
  }
}
.contenBottom {
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
/* 舞台 */
.stage {
  width: 343px;
  height: 80px;
  background: #132ecf;
  opacity: 0.7;
  border-radius: 8px;
  line-height: 80px;
  text-align: center;
  font-size: 20px;
  font-family: Source Han Sans SC;
  font-weight: 400;
  color: #ffffff;
}
/* 餐桌 */
.diningTable {
  margin-top: 20px;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
// 入口
.entrance {
  width: 343px;
  height: 65px;
  background: #132ecf;
  opacity: 0.7;
  border-radius: 8px;
  text-align: center;
  line-height: 65px;
  font-size: 20px;
  font-family: Source Han Sans SC;
  font-weight: 400;
  color: #ffffff;
  position: absolute;
  bottom: 40px;
}
.xuanzhun {
  width: 110px;
  height: 110px;
  margin: 20px;
  border: 5px blue dotted;
  border-radius: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    box-sizing: content-box;
    border-radius: 100% 100%;
    display: block;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background: blue;
  }
}
</style>
