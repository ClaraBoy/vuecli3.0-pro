<template>
<div>
  <div class="con">
      <el-card class="box-card">
        <div id="lefttextbox">"{{this.$route.query.SearchInfo}}"&nbsp<span>{{SearchInfo.length}}</span>&nbsp&nbsp检索</div>
        <div class="mess"><h1>未知查询!</h1></div>
        <div v-for="(item,index) in SearchInfo">
        <div class="textbox" :id="'s'+index" @click="ToAbout(item.menutitle,item.applicationid)" @mouseover="animesmouseover(index)">
            <div class="textleft">日期:{{item.menudate}}</div>
            <div class="textright">
              <span>{{item.menutitle}}</span>
              <span>参与评论:{{item.menucomment}}</span>
              <span>访问量:{{item.menured}}</span>
            </div>
        </div>
<!--          <div v-if="SearchInfo.length===index+1">-->
<!--            <div class="AttachBox">-->
<!--             <div class="AttachLeft">广告位</div>-->
<!--              <div class="AttachRight">广告位</div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </el-card>
  </div>
  <div class="footbackbox">
    <ul>
      <li title="回到顶部" @click="backTop()" class="footback">
        <svg t="1623384090980" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1542" width="48" height="48"><path d="M800.2 128H224.3c-53 0-96 43-96 96v575.9c0 53 43 96 96 96h575.9c53 0 96-43 96-96V224c0-53-43-96-96-96z m-54.8 520.3c-9.4 9.5-24.7 9.5-34.1 0L512.6 448.9 314 648.3c-9.4 9.5-24.7 9.5-34.1 0-9.4-9.5-9.4-24.8 0-34.3l214.5-215.3c5-5 11.7-7.2 18.3-6.9 6.6-0.3 13.3 1.8 18.3 6.9L745.4 614c9.5 9.5 9.5 24.8 0 34.3z" p-id="1543"></path></svg>
      </li>
      <li title="回到首页" @click="backIndex()" class="footIndex">
        <svg t="1623384548480" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2666" width="48" height="48"><path d="M512.492519 28.984695c24.447126 0 47.52359 9.169046 64.981541 25.817787L763.254634 232.097342V141.861463c0-9.931301 8.051138-17.982439 17.982439-17.982439h83.918049c9.931301 0 17.982439 8.051138 17.982439 17.982439v204.643154l128.422587 122.555317c16.101276 15.364995 16.643746 40.820137 1.211817 56.853479-15.430931 16.031344-40.992968 16.573815-57.096242 1.20782L896.124878 470.289733V474.536585H124.423493L69.322302 527.121233c-7.825358 7.468706-17.888531 11.179083-27.935719 11.179083-10.624624 0-21.228269-4.14695-29.159523-12.387902-15.43193-16.032343-14.88846-41.485487 1.212815-56.85248L447.516972 54.812472c17.440968-16.652738 40.518431-25.827778 64.975547-25.827777z" fill="#333333" p-id="2667"></path><path d="M886.634146 456.554146c20.689795 0 37.463415 16.77362 37.463415 37.463415v420.589268c0 20.689795-16.77362 37.463415-37.463415 37.463415l-251.773127 0.000999A39.876059 39.876059 0 0 0 637.377561 938.083902V721.29561c0-22.069448-17.891528-39.960976-39.960976-39.960976H427.582439c-22.069448 0-39.960976 17.891528-39.960976 39.960976v216.788292c0 4.921194 0.889132 9.633592 2.516543 13.987341L138.364878 952.070244c-20.689795 0-37.463415-16.77362-37.463415-37.463415v-420.589268c0-20.689795 16.77362-37.463415 37.463415-37.463415h748.269268z" fill="#333333" p-id="2668"></path></svg>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import {demos} from "../network/request";
import anime from "animejs";
require("../assets/css/Search_page.scss")
export default {
name: "Search_page",
  inject:['reload'],
  data(){
  return{
    SearchInfo: {}
  }
  },
  methods:{
  mod(){
    document.body.style.overflow='';//出现滚动条
    demos({
      url:"/DetaileLick?menutitle="+this.$route.query.SearchInfo,
    }).then(res=>{
      if(res.data.length<=0){
          document.getElementsByClassName("mess")[0].style.display="block";
      }else{
        this.SearchInfo=res.data;
          document.getElementsByClassName("mess")[0].style.display="none";
      }
      let ViewHeight= document.documentElement.clientHeight || document.body.clientHeight;
      if(this.SearchInfo.length*100>document.documentElement.clientHeight)
      {
       // alert(this.SearchInfo.length*100)
       //  document.getElementsByClassName("box-card")[0].style.height=this.SearchInfo.length*100+document.documentElement.clientHeight+"px"
       //  document.getElementsByClassName("con")[0].style.height=this.SearchInfo.length*100+"px"
       //  document.getElementsByClassName("foot")[0].style.position="absolute";
       //  document.getElementsByClassName("foot")[0].style.width="100%";
       //  document.getElementsByClassName("foot")[0].style.bottom=-this.SearchInfo.length*100+200+"px";
      }else{
       // alert(document.body.clientHeight+document.documentElement.clientHeight)
       //  document.getElementsByClassName("box-card")[0].style.height=document.body.clientHeight+document.documentElement.clientHeight+"px"
       //  document.getElementsByClassName("foot")[0].style.position="absolute";
       //  document.getElementsByClassName("foot")[0].style.width="100%";
       //  document.getElementsByClassName("foot")[0].style.bottom=-document.body.clientHeight+"px";


      }
    }).catch(res=>{

    })
  },
    ToAbout(title,applicationid){
      this.$router.push({
            path:"/Details",
        query:{menutitle:title,applicationid:applicationid},
      })
    },
    animesmouseover(num){
    for(let i=0;i<this.SearchInfo.length;i++){
      console.log(i+"/"+num)
          if(i===num){
            anime({
              targets: '#s'+i,
              translateX: "-40px",
              translateY:"-2px",
              easing: 'easeInOutQuart',
              duration: 100,
            });
          }else{
            anime({
              targets: '#s'+i,
              translateX: "40px",
              translateY:"2px",
              easing: 'easeInOutQuart',
              duration: 100,
            });
          }
    }
  },
    backTop(){
      document.documentElement.scrollTop=0;
    },
    backIndex(){
      this.$router.replace("/Clara_Write")
    },
  },
  created() {
  this.mod();
      window.onscroll = function () {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //变量windowHeight是可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        //滚动条到底部的条件
        if (scrollTop + windowHeight > scrollHeight/2+scrollHeight/3) {
          //写后台加载数据的函数
          let top= document.getElementsByClassName("footback")[0];
          top.style.display="block";
        }else{
          let top= document.getElementsByClassName("footback")[0];
          top.style.display="none"
        }
      }
  },
  mounted() {
    this.$store.commit("puLoginShowTo", false);
  },
  beforeRouteUpdate(to, from, next) {
    this.mod();
    next();
    setTimeout(()=>{
      this.reload();
    },1)
  },
}
</script>

<style scoped>
.con{
  left: 0;
  right: 0;
  width: 100%;
  height: auto;
  top: 0;
  position: absolute;
  overflow: hidden;
  margin: 0 auto;
}
.box-card{
  width: 70%;
  margin: 80px auto;
  height: auto;
  position: relative;
}
.mess{
  text-align: center;
  margin-top: 120px;
}
#lefttextbox{
  font-size: 20px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #404040;
}
#lefttextbox span{
  font-size: 16px;
}
.textbox{
  margin: 30px auto;
  height: 100px;
  width: 90%;
  -webkit-box-shadow: 0 0 15px 5px rgba(1,1,1,0.1);
  -moz-box-shadow: 0 0 15px 5px rgba(1,1,1,0.1);
  box-shadow: 0 0 15px 5px rgba(1,1,1,0.1);
  position: relative;
  overflow:hidden;
  cursor: pointer;
  transition: all .1s;
}
.textbox:hover{
  box-shadow:5px 5px 5px 5px rgba(1,1,1,0.1);
}
.textleft{
  width: 30%;
  line-height: 100px;
  position: absolute;
  left: 60px;
  font-size: 20px;
}
.textright{
  width: 70%;
  position: absolute;
  right: 30px;
  line-height: 100px;
}
.textright span{
  margin-left: 33.3px;
}
.textright span:nth-of-type(1){
  font-size: 20px;
}
.AttachBox{
  width: 90%;
  margin: 0 auto;
  display: flex;
  position: absolute;
  bottom: 33.3px;
  left: 5%;
  text-align: center;
}
.AttachLeft{
  flex: 1;
  height: 250px;
  line-height: 250px;
  font-size: 25px;
}
.AttachRight{
  flex: 1;
  height: 250px;
  line-height: 250px;
  font-size: 25px;
}
.footbackbox {
  position: fixed;
  bottom: 120px;
  right: 60px;
  text-align: center;
  background-color: #404040;
}
.footbackbox .footback{
  width: 48px;
  height: 48px;
  list-style: none;
  cursor: pointer;
  position:fixed;
  bottom: 100px;
  right: 60px;
}
.footbackbox .footIndex{
  width: 48px;
  height: 48px;
  position: fixed;
  bottom: 160px;
  right: 60px;
  list-style: none;
  cursor: pointer;
}
</style>
