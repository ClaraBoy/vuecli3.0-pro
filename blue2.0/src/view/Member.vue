<template>
<div>
<div class="text_wrap" v-if="msg">
  <div class="msg"><h3>你还不是创作者!</h3></div>
  <div class="text" @click="showText">如何成为创作者?</div>
</div>
  <div v-else class="Box_wrap">
    <div class="left_wrap">
    <menu class="menu">

<!--      <button class="menu__item active LS" style="&#45;&#45;bgColorItem: rgb(251, 83, 83);" @click="manage">-->
<!--        <svg class="icon" viewBox="0 0 24 24">-->
<!--          <path d="M3.8,6.6h16.4"/>-->
<!--          <path d="M20.2,12.1H3.8"/>-->
<!--          <path d="M3.8,17.5h16.4"/>-->
<!--        </svg>-->
<!--      </button>-->

<!--      <button class="menu__item LA" style="&#45;&#45;bgColorItem:rgb(251, 83, 83);" @click="creation">-->
<!--        <svg class="icon" viewBox="0 0 24 24">-->
<!--          <path  d="M3.4,11.9l8.8,4.4l8.4-4.4"/>-->
<!--          <path  d="M3.4,16.2l8.8,4.5l8.4-4.5"/>-->
<!--          <path  d="M3.7,7.8l8.6-4.5l8,4.5l-8,4.3L3.7,7.8z"/>-->
<!--        </svg>-->
<!--      </button>-->
      <div class="menu__border"></div>

    </menu>
    <div class="svg-container">
      <svg viewBox="0 0 202.9 45.5" >
        <clipPath id="menu" clipPathUnits="objectBoundingBox" transform="scale(0.0049285362247413 0.021978021978022)">
          <path  d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
          c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
          c9.2,3.6,17.6,4.2,23.3,4H6.7z"/>
        </clipPath>
      </svg>
    </div>
    </div>
    <div class="right_wrap">
      <div v-show="isActiveManage" class="ActiveManage_warp">
        <div>
          <div class="cardFs1" v-if="ismsg">
            <div class="picture">
                <PASD @load="Fuck_You" :menus="Menu" @echart="echart" :switchShow="isswitchShow" @updateI="updateI" @creation="creation"/>
            </div>
          </div>
        </div>
        <div>
        <div class="cardFs" v-if="ismsg">
          <div class="picture">
            <echart :id="id" :menu="Menu"/>
          </div>
          <div class="content">
            <div class="desc">
            </div>
          </div>
        </div>
      </div>
      </div>
      <div v-show="isActiveCreation" class="ActiveCreation_warp">
       <div class="UeDitor_Box">
         <Tinymce @manage="manage" :menu="menuTo"/>
       </div>
      </div>
    </div>
  </div>
  <el-dialog
    title="如何成为创作者"
    :visible.sync="dialogVisible"
    modal
    :close-on-click-modal="false"
    width="40%">
    <div>
      ....
    </div>
    <span slot="footer" class="dialog-footer">
      <span class="Application" @click="ApplicationBut">申请成为创作者</span>
  </span>
  </el-dialog>
  <el-dialog
    title="创作者申请"
    :visible.sync="dialogVisible1"
     modal
    top="1%"
    :close-on-click-modal="false"
    width="60%">
    <div class="from-wrap">
      <div class="from-id item">
        <el-form label-position="right" class="e-la" label-width="100px" size="medium">
          <el-form-item label="用户账号:">
            <el-input class="e-in" v-model="applicationUser.applicationid" readonly></el-input>
          </el-form-item>
          <el-form-item label="用户昵称:">
            <el-input class="e-in" v-model="applicationUser.applicationNickName" readonly></el-input>
          </el-form-item>
          <el-form-item label="真实姓名:">
            <el-input class="e-in" type="text" v-model="applicationUser.applicationrealityName" @blur="ChCk(0)"></el-input>
          </el-form-item>
          <el-form-item label="身份证号:">
            <el-input class="e-in" type="text" v-model="applicationUser.applicationcardID" @blur="ChCk(1)"></el-input>
          </el-form-item>
          <el-form-item label="头像上传:">
            <Upload @uploadPop="uploadPopCh"/>
         </el-form-item>
          <el-button type="primary" class="subBut" @click="sub">提交申请</el-button>
          <el-form-item label="申请理由:">
            <el-input class="e-in" type="text" v-model="applicationUser.remark2"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {applicationCon, demos1} from "../network/request";
import store from "../srore";
import anime from "animejs/lib/anime.es.js";
import Tinymce from "../components/Tinymce/index"
import echart from "../view/echart/index"
import PASD from "./PASD/PASD";
require("../assets/css/Menmber.scss")
import Upload from "../components/Upload";
export default {
  name: "Member",
  inject:['reload'],
  components: {Tinymce,echart,PASD,Upload},
  data(){
    return{
      ismsg:true,
      msg:"",
      dialogVisible:false,
      dialogVisible1:false,
      imageUrl: '',
      applicationUser:{
        applicationid:"",
        applicationrealityName:"",
        applicationcardID:"",
        applicationNickName:"",
        applicationimageUrl:"",
        applicationdate:"",
        remark1:"",
        remark2:""
      },
      uploadPop:false,
      isTrue:false,
      isActiveManage:true,
      isActiveCreation:false,
      isActivePersonal:false,
      Menu:{"list":[]},
      ispassActive:true,
      total:Number,
      start:1,
      end:8,
      isRefresh:true,
      isswitchShow:false,
      id:"",
      menuTo:""

    }
  },
  mounted() {
    this.querytotal();
    this.queryMenu();
    this.tabber();
  },
  created() {
    demos1({
      url: "/member",
      method: "GET",
      headers: {
        // 'Content-Type': "application/json;charset=utf-8",
        // "Access-Control-Allow-Credentials":"true",//1
        authorization: localStorage.getItem("sessionId"),
      },
      //    withCredentials:true,//2
    }).then(res => {
      if (res.data === "No authorization") {
        this.msg = true;
        return false;
      }else if(res.data==="err"){
        this.$message({
          type: 'info',
          message: '请登录再进行操作'
        });
        this.$router.push({
          path:"/"
        })
        return false;
      }
      this.msg = false;


      anime({
        targets: '.cardFs',
        translateX: -440,
        duration: 5000
      });
        anime({
          targets: '.cardFs1',
          translateY: 670,
          duration: 5000
        });
    }).catch(err => {
      console.log(err)
    });
  },

























  methods:{
    uploadPopCh(bool){
        this.uploadPop=bool;
    },
    updateI(id){
      this.isActiveManage=false;
     this.isActiveCreation=true;
     this.Menu.list.forEach(value=>{
       if(id===value.menuid){
         this.menuTo=value;
       }
     })


    },
    echart(id){
      this.id=id;
    },
    Fuck_You(){
      if(this.total===this.Menu.list.length){
        this.$message('没有更多文章了');
          return false;
      }
      this.start++;
        this.queryMenu();
        // this.isRefresh = false;            //先关闭，
        // this.$nextTick(function () {
        //   this.isRefresh = true;         //再打开
        // })
    },
    passBut(){
      this.ispassActive=true;
    },
    nopassBut(){
      this.ispassActive=false;
    },
    showText(){
      this.dialogVisible=true;
    },
    ApplicationBut(){
      applicationCon({
        url:"/"+this.$store.getters.Retusername,
        method:"GET",
      }).then(res=>{
        if(res.data===1){
          this.$message.success("您已提交 等待审核中")
        }else{
          this.dialogVisible=false;
          this.dialogVisible1=true;
          this.applicationUser.applicationid=this.$store.getters.Retusername;
          this.applicationUser.applicationNickName=this.$store.getters.Retnickname;
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    ChCk(chk){
      const nameReg="^[\u4e00-\u9fa5]{0,}$";
      let nameRg=new RegExp(nameReg);
      const CardIdReg="^\\d{15}|\\d{18}$";
      let CardIdRg=new RegExp(CardIdReg);
      if(this.applicationUser.applicationrealityName!==""&&this.applicationUser.applicationcardID!==""){
          if(chk===0) {
            if (nameRg.test(this.applicationUser.applicationrealityName)) {
                    this.isTrue=true;
            }else{
                this.$message.error('汉子');
                this.isTrue=false;
            }
          }
          if(chk===1){
              if(CardIdRg.test(this.applicationUser.applicationcardID)){
                        this.isTrue=true;
                }else{
                  this.$message.error('身份证格式错误');
                this.isTrue=false;
              }
              }
          }else{
            this.$message.error('必填项不可为空');
            this.isTrue=false;
      }
    },
    sub(){
    if(this.isTrue&&this.applicationUser.remark2&&this.uploadPop){
      applicationCon({
              url:"/add",
              method:"POST",
              data:this.applicationUser,
       }).then(res=>{
            if(res.data===1){
              this.$message.success("提交成功 等待审核中");
              this.applicationUser={};
              this.dialogVisible1=false;
              return false;
            }else if(res.data===400){
              this.$message.error("已提交 等待审核中")
              return false;
            }
            this.$message.error("提交出错")
       })
      return false;
    }
      this.$message.error('必填项不可为空或格式错误');
    },
    manage(){
      this.menuTo="";
      this.querytotal();
      anime({
        targets: '.cardFs',
        translateX: -440,
        easing: 'easeInOutSine'
      });
      anime({
        targets: '.cardFs1',
        translateY: 670,
        easing: 'easeInOutSine'
      });
      this.isActiveManage=true;
      this.isActiveCreation=false;
      this.isActivePersonal=false;
      // this.isRefresh = false;            //先关闭，
      // this.$nextTick(function () {
      //   this.isRefresh = true;         //再打开
      // })
    },
    creation(){
      anime({
        targets: '.cardFs',
        translateX: 440,
      });
      anime({
        targets: '.cardFs1',
        translateY: -670,
      });
      this.isActiveManage=false;
      this.isActiveCreation=true;
      this.isActivePersonal=false;
    },
    personal(){
      anime({
        targets: '.cardFs',
        translateX: 440,
      });
      anime({
        targets: '.cardFs1',
        translateY: -640,
      });
      this.isActiveManage=false;
      this.isActiveCreation=false;
      this.isActivePersonal=true;
    },
    tabber(){
      anime({
        targets: '.LA',
        translateY: 15,
        easing: 'easeInOutSine'
      });
      anime({
        targets: '.LS',
        translateY: -15,
        easing: 'easeInOutSine'
      });
      anime({
        targets: '.LP',
        translateY: 35,
        easing: 'easeInOutSine'
      });
    },
    querytotal(){
      applicationCon({
        url:"/total/"+this.$store.getters.Retusername,
        method:"GET",
      }).then(res=>{
        this.total=res.data;
      })
    },
    queryMenu(){
      this.isswitchShow=true;
      applicationCon({
        url:"/queryMenu/"+this.$store.getters.Retusername+"/"+this.start+"/"+this.end,
        method:"GET",
      }).then(res=>{
        if(this.Menu["list"].length <= 0){
          this.Menu.list=res.data;
        }else{
          res.data.forEach((keys,value)=>{
            this.Menu["list"].push(keys);
          })
        }
      })
    },
  }
}



















</script>

<style scoped>
.text_wrap{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.text_wrap .text{
    padding: 10px 10px 10px 10px;
    font-size: 15px;
    cursor: pointer;
}
.dialog-footer .Application{
   font-size: 16px;
    color: #6dbfff;
    cursor: pointer;
}
.from-wrap{
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-items: center;
}
.from-wrap .item{
  margin: 0 auto;
  width: 80%;
}
.e-in{
  width: 60%;
  text-align: center;
}
.e-la{
  margin: 0 auto;
}
.subBut{
  margin: 0 auto;
  position: absolute;
  right: 40px;
  bottom: 40px;
}
.Box_wrap{
  display: flex;
  position: absolute;
  width: 100%;
  left: 0;
  height: auto;
  bottom: 0;
  top: 49px;
  overflow: hidden;
}
.left_wrap{
  display: flex;
  width: 7%;
  flex-direction: column;
  justify-items: left;
  align-items: center;
  justify-content: center;
}

.menu{
  display: flex;
  flex-direction: column;
  margin: 0;
  /* Works well with 100% width  */
  /*width: 32.05em;*/
  font-size: 1.5em;
  padding: 0 1.00em;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: var(--bgColorMenu);
  width: auto;

}

.menu__item{
  all: unset;
  flex-grow: 1;
  z-index: 100;
  /*display: flex;*/
  cursor: pointer;
  position: relative;
  border-radius: 50%;
  align-items: center;
  will-change: transform;
  justify-content: center;
  padding: 0.55em 0 0.85em;
  transition: transform var( var(--duration));
  display: none;

}

.menu__item::before{
  content: "";
  z-index: -1;
  width: 3.0em;
  height: 3.0em;
  border-radius: 50%;
  position: absolute;
  transform: scale(0);
  transition: background-color var(--duration), transform var(--duration);
}


.menu__item.active {

  transform: translate3d(0, -.8em , 0);

}

.menu__item.active::before{

  transform: scale(1);
  background-color: var(--bgColorItem);

}

.icon{

  width: 1.6em;
  height: 1.6em;
  stroke: black;
  fill: transparent;
  stroke-width: 1pt;
  stroke-miterlimit: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 400;

}

.menu__item.active .icon {

  animation: strok 1.5s reverse;

}

@keyframes strok {

  100% {

    stroke-dashoffset: 400;

  }

}

.menu__border{

  left: 0;
  bottom: 99%;
  width: 10.9em;
  height: 2.4em;
  position: absolute;
  clip-path: url(#menu);
  will-change: transform;
  background-color: transparent;
  transition: transform var(var(--duration));

}

.svg-container {

  width: 0;
  height: 0;
}


@media screen and (max-width: 50em) {
  .menu{
    font-size: .8em;
  }
}

.right_wrap{
  display: flex;
  width: 100%;
  right: 0;
  position: relative;
}

.ActiveManage_warp{
  overflow: hidden;
  width: 100%;
 // background-color: #00a0e9;
}
.ActiveCreation_warp{
  width: 100%;
 // background-color: red;
}
.isActivePersonal_warp{
  width: 100%;
//  background-color: #9cb945;
}






































.cardFs {
  position: absolute;
  right: -410px;
  width: 500px;
  background: white;
  box-shadow:white;
  margin-bottom: 20px;
  border-radius: 10px;
  font-size: 14px;
  height: 100%;
}
.cardFs .picture {
  background-position: 50%;
  background-size: cover;
  height: 300px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.cardFs .content {
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
}

.cardFs .header {
  display: flex;
  align-items: center;
}

.cardFs .profile-pic {
  background-image: url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
  background-position: 50%;
  background-size: cover;
  height: 60px;
  width: 60px;
  border-radius: 50%;
}

.cardFs .detail {
  margin-left: 10px;
  color: white;
}

.cardFs .posted {
  font-size: 10px;
  padding-top: 3px;
}

.cardFs .desc {
  color: white;
  padding-top: 10px;
  line-height: 1.5;
}

.cardFs .tags {
  font-size: 12px;
  color: #FFDF3B;
  padding-top: 10px;
}

.cardFs .footer {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  color: white;
}

.cardFs .footer .like {
  flex: 0 0 25%;
}

.cardFs .footer .comment {
  flex: 1;
}

.cardFs .footer .share {
  flex: 0 0 18%;
}

.cardFs .footer i {
  padding-right: 3px;
}























.cardFs1 {
  position: absolute;
  left: 10%;
  top: -650px;
  width: 600px;
  height:auto;
  background:  #556270;
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, .5);
  margin-bottom: 20px;
  border-radius: 10px;
  font-size: 14px;
}
.cardFs1 .picture {
 <!--  background-image: url('https://images.unsplash.com/photo-1508166785545-c2dd4c113c66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');-->
  background-position: 50%;
  color: white;
  background-size: cover;
  height: 640px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
}


.cardFs1 .desc {
  color: white;
  padding-top: 10px;
  line-height: 1.5;
}

.card1 .footer i {
  padding-right: 3px;
}
.UeDitor_Box{
  position: absolute;
  top: 5%;
  left: 8%;
  width: 60%;
}
.butBox{
  width: 100%;
  display: flex;
  padding: 5px 5px;
  height: 120px;
}
.cardFs1 .picture button{
  border-radius: 5px;
  width: 50%;
  padding: 5px 5px;
  margin: 5px 5px;
  cursor: pointer;
}
.dialogVisibleBox_wrap{
  position: relative;
  height:100%;
  width: 100%;
}
.dialogVisibleBox div{
    display: flex;
  justify-content: center;
  justify-items: center;
  text-align: center;
}
.dialogVisibleBox span{
    flex: 1;
  align-items: center;

}
</style>
