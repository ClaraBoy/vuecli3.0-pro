<template>
<div>
  <div class="con">
    <div class="coo">
    <div class="left">
      <br>
      <div>
      <div class="imgBox" @click="Abotuto()">
        <img :src="ismagesTo[0]" alt="图片迷路了">
        <div class="left_data"><h1>{{items.menutitle}}</h1></div>
      </div>
      <div class="left_span">
        <h1>{{items.menudate}}</h1>
      </div>
      <br><br><br> <br><br><br>
      <div class="left_red"><h2>阅读量:{{items.menured}}</h2></div>
        <br><br>
        <div class="left_red2">作者:{{items.applicationid}}</div>
      <br><br><br>
    </div>
    </div>
      <div class="right_span">
        <div :class="{showActive:isShowActive}"><right :index="index" :rightto="[items.info1?items.info1:'暂无',items.info1Url?items.info1Url:0,items.info2?items.info2:'暂无',items.info2Url?items.info2Url:0]"></right></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import right from "./right";
import {demos} from "../../network/request";
require("../../assets/css/Bloe_media.scss")
export default {
name: "demo_item",
  components:{
    right
  },
  props:{
    items:Object,
    index:Number,
  },
  data(){
  return{
    isShowActive:false,
   // ismags:require('../../assets/img/Bloe/'+Number(this.index+1)+'.png')
   //  ismags:require('../../assets/img/Bloe/'+Number(1)+'.png'),
    ismagesTo:[]

  }
  },
  methods: {
    Abotuto() {
      this.$router.push({
        path: "/Details",
        query: {menutitle: this.items.menutitle, applicationid: this.items.applicationid}
      })
    },
    getImage(applicationid,titleName){
      demos({
        url:"/file/TitleImage/"+applicationid+"/"+titleName,
        responseType: "arraybuffer",
      }).then(res=>{
        this.ismagesTo.push(("data:image/png;base64," +
          btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          )))
      }).catch(err=>{
        console.log(err)
      })
    },
  },
  mounted() {
  this.getImage(this.items.applicationid,this.items.menutitle);
    anime({
      targets: '.imgBox',
      width:410,
      duration: 1400,
      easing: 'easeInOutExpo'
    });
    setTimeout(()=>{
      anime({
        targets: '.right',
        right:0,
        width:700,
        duration: 1600,
        easing: 'easeInOutExpo'
      });
      anime({
        targets: '.left_span',
        translateY: "70px",
        translateX: "70px",
        duration: 1600,
        color:"",
        easing: 'easeInOutExpo'
      });
      setTimeout(()=>{
        this.iss=false;
      },2000)
      setTimeout(()=>{
        anime({
          targets: '.right',
          width:0,
          duration: 1600,
          easing: 'easeInOutExpo'
        });
      },900)
    },100)
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.con{
  width: 100%;
  transition-duration: 2s;
  height: auto;
  margin: 6% auto;
  position: relative;
}
.coo{
  margin: 0 auto;
  display: flex;
  flex-flow: wrap;
  width: 90%;
  height:320px;
  justify-content: center;
  position: relative;
}
.left{
  position: absolute;
  background-color: #FB5353;
  width: 40%;
  height: 320px;
    left: 0;
}
.left_span{
  display: inline-flex;
  top: 0;
  position: absolute;
  color: white;
  left: 1%;
}
.imgBox{
  position: absolute;
  width: 80%;
  height: 260px;
  margin-left: 50%;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 7px 29px 49px 0px rgba(0,0,0,3);
  cursor:pointer;
}
img{
  height: 100%;
  width: 100%;
}
.right{
  position: absolute;
  background-color: #404040;
  right: 50%;
  height: 320px;
  width: 200px;
  z-index: 30;
}
.right_span{
  height: 60px;
  position: absolute;
  right: 60px;
}
.s{
 color: transparent;
 }
.left_red{
  color: white;
  margin-left: 130px;
  transition: all 2s;
}
.left_red2{
  font-size: 15px;
  color: white;
  margin-left: 30px;
  transition: all 2s;
}
.left_data{
 padding-right: 130px;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: white;
  margin-left: 5%;
  transition: all 1s;
  position: absolute;
  transform: translateX(22%);
  z-index: 20;
  bottom: 50px;
}
.showActive{
  display: none;
}
</style>
