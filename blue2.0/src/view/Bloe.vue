<template>
  <div class="cl">
    <div style="height: auto;width: 100%;">
    <div class="Suspension">
      <div class="lao">
      <div class="Su1" style="height: 60px;">
        <span  style="color: #FB5353;height: 60px" @click="getMusic">Hi</span>&nbsp;
        <audio controls currentTime autoplay="true" :src='musicTo' id="test" v-show="false" v-if="musicTo"></audio>
        <span  style="color: #404040" v-show="this.$store.getters.Retnickname">{{this.$store.getters.Retnickname}}</span>
      </div>
      <div class="Su2" style="color: black;height: 60px">
        <span style="color: #FB5353;">Clara</span>
        <span style="color: #404040">Write</span>
      </div>
      </div>
      <div class="ispo">
      <div class="SuspensionHr"></div>
      </div>
      <div class="menu" :class="{p_readOnlyS:readOnlyS}">
        <div>
          <svg style="display: none"  t="1625147312870" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2388" width="32" height="32"><path d="M382.3 165.6h-165c-47.5 0-86 38.4-86 86v165c0 47.5 38.4 86 86 86h165c47.5 0 86.5-38.4 86-86v-165c0-47.6-38.5-86-86-86z m43.3 251c0 11.2-4.3 21.9-12.3 29.9-8 8.5-19.2 12.8-31 12.8h-165c-24 0-43.2-19.2-43.2-43.2V251c0-24 19.2-43.2 43.2-43.2h165v0.5c24 0 43.2 19.2 43.2 43.2v165.1zM382.3 557.5h-165c-47.5 0-86 38.4-86 86v165c0 47.5 38.4 86 86 86h165c47.5 0 86.5-38.4 86-86v-165c0-47.6-38.5-86-86-86z m43.3 251c0 11.2-4.3 21.9-12.3 29.9-8 8.5-19.2 12.8-31 12.8h-165c-24 0-43.2-19.2-43.2-43.2V643.5c0-24 19.2-43.2 43.2-43.2h165c24 0 43.2 19.2 43.2 43.2v165zM871.4 273.5L755 157.1c-16-16-37.9-25.1-60.9-25.1s-44.8 9.1-60.9 25.1L516.9 273.5c-33.6 33.6-33.6 88.1 0 121.7l116.4 116.4c16 16 37.9 25.1 60.9 25.1s44.8-8.5 60.9-25.1l116.4-116.4c33.5-33.6 33.5-88.1-0.1-121.7zM841 364.8L724.6 481.2c-7.5 8-18.2 12.3-30.4 12.3-11.7 0-22.4-4.8-30.4-12.8L547.3 364.2c-8-8-12.8-19.2-12.8-30.4 0-11.7 4.3-22.4 12.8-30.4L663.7 187c8-7.5 19.2-12.3 30.4-12.3 11.7 0 22.4 4.8 30.4 12.8L841 303.9c8 8 12.8 19.2 12.8 30.4 0 11.8-4.3 22.5-12.8 30.5zM776.4 557.5h-165c-47.5 0-86 38.4-86 86v165c0 47.5 38.4 86 86 86h165c47.5 0 86.5-38.4 86-86v-165c-0.1-47.6-38.5-86-86-86z m43.2 251c0 11.2-4.3 21.9-12.3 29.9-8 8.5-19.2 12.8-31 12.8h-165c-24 0-43.2-19.2-43.2-43.2V643.5c0-24 19.2-43.2 43.2-43.2h165c24 0 43.2 19.2 43.2 43.2v165z" p-id="2389"></path></svg></div>
         <div class="menu_box">
              <div style="color: black"></div>
         </div>
      </div>
    </div>
    <div class="Bloe-top">
      <div class="Bloe-top-1">
        <div class="imgto">
          <div class="slider">
            <div :class="{datetime:isdatetime,datetime2:isdatetime2}" @click="playtime()"><h1>{{time}}</h1></div>
            <div class="item is-active">
              <div class="imgs">
                <div class="grid">
                  <div class="img img-1">
                    <img src="https://picsum.photos/seed/a/700/700"/></div>
                  <div class="img img-2">
                    <img src="https://picsum.photos/seed/b/700/700"/></div>
                  <div class="img img-3">
                    <img src="https://picsum.photos/seed/c/700/700"/></div>
                  <div class="img img-4">
                    <img src="https://picsum.photos/seed/d/700/700"/></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Bloe-top-2">
        <div class="Bloenaem">
          <div class="Bloenaem-1" @click="isdemos()"><h2>最佳评论</h2></div>
          <div class="Bloenaem-2" @click="isdemos2()"><h2>博客</h2></div>
        </div>
        <div><demo :peos="peo[isdemo].list" :isdemos="isdemo"></demo></div>
      </div>
    </div>
    <div><newdemo :Li="Li"></newdemo></div>
    <div style="margin-top: 2%;height: 80px"></div>
    <div class="footbackbox">
      <ul>
        <li title="回到顶部" @click="backTop()" class="footback">
          <svg t="1623384090980" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1542" width="48" height="48"><path d="M800.2 128H224.3c-53 0-96 43-96 96v575.9c0 53 43 96 96 96h575.9c53 0 96-43 96-96V224c0-53-43-96-96-96z m-54.8 520.3c-9.4 9.5-24.7 9.5-34.1 0L512.6 448.9 314 648.3c-9.4 9.5-24.7 9.5-34.1 0-9.4-9.5-9.4-24.8 0-34.3l214.5-215.3c5-5 11.7-7.2 18.3-6.9 6.6-0.3 13.3 1.8 18.3 6.9L745.4 614c9.5 9.5 9.5 24.8 0 34.3z" p-id="1543"></path></svg>
        </li>
      </ul>
    </div>
  </div>
  <foot></foot>
  </div>
</template>
<script>
import anime from "animejs/lib/anime.es.js";
import demo from "./demo/demo"
import {demos, sp} from "../network/request"
import newdemo from "../view/new_demo/demo"
import Foot from "../components/foot";
export default {
  name: "Bloe",
  inject: ['reload'],
  components: {
    Foot,
    demo,
    newdemo,
  },
  data() {
    return {
      translateX: 200,
      isdatetime: true,
      isdatetime2: false,
      isdemo: "lists",
      //在数据库查出第一个标签的四条和第二个标签的四条然后放入各自内容放入各自选项卡
      peo: {
        "lists":
          {
            list:
              [
                {
                  menuid: "",
                  menutitle: "",
                  menudate: "",
                  menured: '',
                  menucomment: "",
                  titleid: "",
                  info1: "",
                  info1Url:"",
                  info2: "",
                  info2Url:"",
                  info3: "",
                  applicationid:""
                }
              ]
          },
        "lists2":
          {
            list:
              [
                {
                  menuid: "",
                  menutitle: "",
                  menudate: "",
                  menured: '',
                  menucomment: "",
                  titleid: "",
                  info1: "",
                  info1Url:"",
                  info2: "",
                  info2Url:"",
                  info3: "",
                  applicationid:""
                }
              ]
          }
      },
      Li: {},
      msg_data: [],
      lockReconnect: false,//是否真正建立连接
      timeout: 5 * 1000,//5秒一次心跳
      timeoutObj: null,//心跳心跳倒计时
      serverTimeoutObj: null,//心跳倒计时
      timeoutnum: null,//断开 重连倒计时
      mess: "",
      Top: 0,
      TopData: 0,
      pso: 10,
      websocks:"",
      readOnlyS:false,
      musicTo:"",
    }
  },
  methods: {
    backTop() {
      document.documentElement.scrollTop = 0;
    },
    playtime() {
      anime({
        targets: '.datetime,.datetime2',
        translateX: this.translateX,
        direction: "alternate",
        easing: 'easeInOutExpo'
      });
      setTimeout(() => {
        this.isdatetime = false;
        this.isdatetime2 = true;
      }, 1000)
      setTimeout(() => {
        this.isdatetime = true;
        this.isdatetime2 = false;
      }, 2000)
    },
    isdemos() {
      this.isdemo = "lists";
    },
    isdemos2() {
      this.isdemo = "lists2";
    },
    getMenucomments() {
      demos({
        url: "/Menucomments?comments=1&Review=yes",
      }).then(res => {
        this.peo["lists"].list = res.data;
        // console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
    },
    getMenuyear() {
      demos({
        url: "/Menuyear?year=2021&Review=yes",
      }).then(res => {
        this.peo["lists2"].list = res.data;
        //  console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
    },
    getList() {
      demos({
        url: "/queryLists",
      }).then(res => {
        this.Li = res.data;
      }).catch(err => {
        console.log(err);
      })
    },





    initWebSocketTo: function () {
      this.websocks = this.websock = new WebSocket("ws:/" + sp + "/The_heartbeat");
      this.websock.onopen = this.websocketonopenTo;
      this.websock.onerror = this.websocketonerrorTo;
      this.websock.onmessage = this.websocketonmessageTo;
      this.websock.onclose = this.websocketcloseTo;
    },
    startTo() {
      if (this.lockReconnect === true) {
        clearInterval(this.timeoutnum);
        this.serverTimeoutObj = setInterval(() => {
          this.timeoutObj = setTimeout(() => {
            this.websocketsendTo("200");
            if (this.mess.toString() === "200") {
              this.getMenuyear();
              this.getMenucomments();
              this.getList();
            }
          });
        }, this.timeout)
      } else {
      clearInterval(this.serverTimeoutObj);
        clearInterval(this.timeoutObj);
        this.timeoutnum = setInterval(() => {
          setTimeout(this.websocketonopenTo, 0)
        }, 5000)
      }
    },
    websocketonopenTo: function (e) {
      console.log("主页面WebSocket页面更新连接成功");
      this.lockReconnect = true;
      this.startTo();
    },
    websocketonerrorTo: function (e) {
      console.log("主页面WebSocket连接发生错误");
      this.websocketonopen();
    },
    websocketonmessageTo: function (e) {
      //接收数据
      // var da = JSON.parse(e.data);
      this.mess = e.data.toString();
    },
    websocketcloseTo: function () {

    },
    websocketsendTo(Data) {
      this.websock.send(Data);
    },
    toMember(){
      //会员
      this.$router.push({
        name:"Member",
      })
    },
    getMusic() {
      demos({
        url: "/file/music",
        method: "GET",
        responseType: "arraybuffer",
      }).then(res => {
        this.musicTo = "data:audio/mp3;base64," +
          btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
      })
    }
    },







    computed: {
      time() {
        let date = new Date();
        let month = date.getMonth()+1 <10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "-" + month + "-" + day;
      }
    },
    mounted() {
      document.body.style.overflow = '';//出现滚动条
      this.getMenucomments();
      this.getMenuyear();
      this.getList();
    },
    created() {
     this.initWebSocketTo();
      window.onscroll = function () {
        let windowWidth = document.documentElement.offsetWidth || document.body.offsetWidth;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        //滚动条到底部的条件
        if (scrollTop + windowHeight > scrollHeight / 2 + scrollHeight / 3) {
          //写后台加载数据的函数
          let top = document.getElementsByClassName("footback")[0];
          top.style.display = "block";
        } else {
          let top = document.getElementsByClassName("footback")[0];
          top.style.display = "none"
        }
        //((文档高度-可视高度)/当前滚动条高度)*100
        this.pos = (scrollTop / (scrollHeight - windowHeight)) * 100;
        if (scrollTop > this.Top) {
          anime({
            targets: '.SuspensionHr',
            width: this.pos + "%",
          });
          anime({
            targets: '.Su1',
            translateY: "0px",
            duration: 800,
          });
          anime({
            targets: '.Su2',
            translateY: "60px",
            duration: 800,
          });
        }
        if (scrollTop < this.Top) {
          anime({
            targets: '.SuspensionHr',
            width: this.pos + "%",
          });
          anime({
            targets: '.Su1',
            translateY: "60px",
            duration: 800,
          });
          anime({
            targets: '.Su2',
            translateY: "-60px",
            duration: 800,
          });

        }
        this.Top = scrollTop;
        if (scrollTop > 0) {
          //写后台加载数据的函数
          document.getElementsByClassName("Suspension")[0].style.visibility = "visible";
        } else {
          document.getElementsByClassName("Suspension")[0].style.visibility = "hidden";
        }
      }
    },
    beforeDestroy:function(){
      this.websocketcloseTo();
      this.websocks.close();
      clearInterval(this.serverTimeoutObj);
      clearInterval(this.timeoutObj);
      console.log("我已经离开了！");
      console.log("主页面websocket已关闭");
    },
}
</script>
<style lang="scss" scoped>
.cl{
  position: relative;
  height:auto;
  width: 100%;
}
.cl h1{
  text-align: center;
  padding-top: 30px;
}
.Suspension{
  background-color: white;
  width: 100%;
  height: 60px;
  text-align: center;
  position: sticky;
  top: -1px;
  margin: 0 auto;
  float: left;
  color: white;
  line-height: 60px;
  z-index: 600;
  -webkit-box-shadow: 0 0 15px 5px rgba(1,1,1,0.1);
  -moz-box-shadow: 0 0 15px 5px rgba(1,1,1,0.1);
  box-shadow: 0 0 15px 5px rgba(1,1,1,0.1);
  visibility: hidden;
}
.ispo{
  width: 100%;
  z-index: 600;
  overflow: hidden;
}
.Suspension .lao{
  overflow: hidden;
  width: 600px;
  margin: 0 auto;
  height: 60px;
  justify-content: center;
}
.SuspensionHr{
  background-color: #FB5353;
  height: 5px;
}
.menu{
  left: 30px;
  position: absolute;
  top: 15px;
  line-height: 30px;
  width: 30px;
  cursor: pointer;
}
.p_readOnlyS{
  pointer-events: none;
}
.Suspension .menu_box{
  top: 50px;
  background-color: black;
  left: -30px;
  position: absolute;
  width: 1000%;
  z-index: 80;
  box-shadow: 10px 0 5px rgba(1,1,1,0.5);
}
h1,span,h2,h3:hover{
  cursor:pointer;
}
.Bloe-top{
  flex-flow: wrap;
  width: 100%;
  height: auto;
  display:flex;
  margin-top:2%;
  position: relative;
}
.Bloe-top-1{
display: flex;
  flex: 1;
}
.Bloe-top-2{
  flex: 1;
}
.imgto{
  width: 100%;
}
.datetime
{
  align-self: center;
  z-index: 5;
  transition-duration: 0.2s;
}
.datetime2
{
  align-self: center;
  z-index: 5;
  color: Transparent;
  transition-duration: 0.2s;

}
.Bloenaem{
  text-align: center;
  display: flex;
}
.Bloenaem-1{
  height: 60px;
  line-height: 60px;
  width: 50%;
  transition-duration: 0.6s;
  margin-left: 4%;
}
.Bloenaem-2{
  height: 60px;
  line-height: 60px;
  width: 25%;
  transition-duration: 0.6s;
}
.Bloenaem-1:hover{
  background-color: #FB5353;
  color: white;
  margin-left: 8%;
}
.Bloenaem-2:hover{
    background-color: #404040;
    color: white;
  margin-left: 4%;
}
*,
*:before,
*:after{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html, body{
  font-family: "Commissioner", sans-serif;
  line-height: 1.65;
}

$black: #0a0908;
$gunmetal: #22333b;
$almond: #eae0d5;
$khaki: #c6ac8f;
$umber: #5e503f;

@mixin filter{
  position: relative;
  -webkit-filter: contrast(110%) brightness(110%) saturate(130%);
  filter: contrast(110%) brightness(110%) saturate(130%);
&::before{
   content: "";
   display: block;
   height: 100%;
   width: 100%;
   top: 0;
   left: 0;
   position: absolute;
   pointer-events: none;
   mix-blend-mode: screen;
   background: rgba(243, 106, 188, 0.3);
 }
}

a{
  color: $khaki;
  text-decoration: none;
}
.slider{
  height: 100%;
  width: 100%;
  background-color: $black;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  overflow: hidden;
  transition: background-color 2s;

.credits{
  position: absolute;
  top: 2rem;
  left: 2rem;
  line-height: 1.65;
  z-index: 10;
  max-width: 320px;
}
}
.slider .item .imgs{
  position: relative;
  width: 75%;
  padding-top: 75%;

.grid{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  transform: rotate(-20deg);
  opacity: 0.65;
}
}
.slider .item{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

.img{
  width: 100%;
  height: 100%;
  position: relative;
  will-change: transform;
  will-change: opacity;

img{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  @include filter;
}
img:hover {
    -webkit-animation: circle .75s;
    animation: circle .75s;
  }
  @-webkit-keyframes circle {
    0% {
      opacity: 1;
    }
    40% {
      opacity: 1;
    }
    100% {
      width: 200%;
      height: 200%;
      opacity: 0;
    }
  }
  @keyframes circle {
    0% {
      opacity: 1;
    }
    40% {
      opacity: 1;
    }
    100% {
      width: 200%;
      height: 200%;
      opacity: 0;
    }
  }
}
.img-1{ grid-area: 1 / 1 / 7 / 5; }
.img-2{ grid-area: 2 / 5 / 7 / 13; }
.img-3{ grid-area: 7 / 1 / 12 / 9; }
.img-4{ grid-area: 7 / 9 / 13 / 13; }

.content{
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.15;
  font-size: 8rem;
  font-weight: 700;

.wrap{
  text-align: center;
  text-shadow: 1px 1px 4px rgba($black, 0.2);
  width: 100%;
  max-width: 600px;
  line-height: 1;

.letter{ display: inline-block; }
}
}
}
.slider .nav{
.next, .prev{
  height: 2rem;
  width: 2rem;
  position: absolute;
  top: calc(50% - 1rem);
  cursor: pointer;
  z-index: 3;
  transition: transform 0.3s;
}
.next{
  right: 2rem;
  background-image: url("data:image/svg+xml,%3C?xml version='1.0' encoding='utf-8'?%3E %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M 19 8 L 19 11 L 1 11 L 1 13 L 19 13 L 19 16 L 23 12 L 19 8 z' fill='white'/%3E%3C/svg%3E");
&:hover{ transform: translateX(0.5rem); }
}
.prev{
  left: 2rem;
  background-image: url("data:image/svg+xml,%3C?xml version='1.0' encoding='utf-8'?%3E %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M 5 8 L 1 12 L 5 16 L 5 13 L 23 13 L 23 11 L 5 11 L 5 8 z' fill='white'/%3E%3C/svg%3E");
&:hover{ transform: translateX(-0.5rem); }
}
.explore-btn{
  z-index: 4;
  position: absolute;
  bottom: 2rem;
  left: calc(50% - 4rem);
  width: 8em;
  text-align: center;
  padding: 1rem 0;
  border: solid 2px white;
  background: transparent;
  color: white;
  transition: background-color 0.3s;
  cursor: pointer;
&:hover{
   color: $black;
   background: white;
 }
}
}
.slider .item:not(.is-active){
  opacity: 0;
  pointer-events: none;
}
.footbackbox {
  position: fixed;
  background-color: black;
  bottom: 120px;
  right: 80px;
  text-align: center;
}
.footbackbox .footback{
  width: 48px;
  height: 48px;
  list-style: none;
  cursor: pointer;
  position:fixed;
  bottom: 100px;
  right: 60px;
  display: none;
}






</style>
