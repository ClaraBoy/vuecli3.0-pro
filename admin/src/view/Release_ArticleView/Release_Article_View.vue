<template>
<div class="Clara">
    <div class="grid-content bg-purple">
      <el-input type="text" v-model="title" placeholder="请输入标题" :readonly="titleName&&applicationidTo" style="text-align: center"/>
      <div class="left"><vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap></div>
    </div>
  <el-dialog
    title="文章预览"
    :visible.sync="dialogVisible"
    fullscreen modal :close-on-click-modal="false">
          <div class="grid-content bg-purple-light">
          <h2 style="text-align: center">标题:{{title}}</h2>
            <br>
          <div class="right">
            <el-scrollbar style="height:100%;">
            <div v-html="msg"></div>
            </el-scrollbar>
          </div>
        </div>
  </el-dialog>
  <div class="rightset">
    <h2>设置区域</h2>
    <span>当前时间: {{nowTime}}</span>
    <span>{{nowWeek}}</span>
    <br>
    <div>
      <br>
      <span>是否开启相关内容:{{radio}}</span>
      <el-radio-group v-model="radio" style="padding-left: 20px;display: inline">
        <el-radio-button label="开启"></el-radio-button>
        <el-radio-button label="关闭"></el-radio-button>
      </el-radio-group>
      <br>
      <br>
      <div v-if="radio==='开启'" style="display: inline">
       <el-lable>相关1:</el-lable> <el-input type="text" placeholder="相关1" v-model="about1" style="width: 120px"></el-input>
       <el-lable>url:</el-lable> <el-input type="text" placeholder="相关1" v-model="about1url" style="width: 120px"></el-input>
<!--        &nbsp;-->
<!--        <el-lable>链接1:</el-lable><el-input type="text" placeholder="链接1" v-model="about1" style="width: 200px"></el-input>-->
        <br>
        <br>
        <el-lable>相关2:</el-lable> <el-input type="text" placeholder="相关2" v-model="about2" style="width: 120px"></el-input>
        <el-lable>url:</el-lable> <el-input type="text" placeholder="相关2" v-model="about2url" style="width: 120px"></el-input>
<!--        &nbsp;-->
<!--        <el-lable>链接2:</el-lable><el-input type="text" placeholder="链接2" v-model="about1" style="width: 200px"></el-input>-->
      </div>
      <br>
      <br>
      <span>是否热门:{{radio1}}</span>
      <el-radio-group v-model="radio1">
        <el-radio-button label="热门"></el-radio-button>
        <el-radio-button label="普通"></el-radio-button>
      </el-radio-group>
      <br>
      <br>
      <br>
      <div style="display: inline">
        <span style="padding-left: 30px">当前最大条数:{{Details}}</span>
        <el-button type="primary" @click="butDetails()" style="width: 80px;height: 40px;margin-left: 30px">更新页面</el-button>
      </div>
      <br>
      <br>
      <br>
    </div>
    <el-button type="primary" @click="butmsg" style="width: 80px;height: 40px;margin-left: 30px" v-show="!titleName&&!applicationidTo">发布文章</el-button>
    <el-button type="primary" @click="butupdate" style="width: 80px;height: 40px;margin-left: 30px" v-show="titleName&&applicationidTo">修改文章</el-button>
    <br>
    <br>
    <el-button type="primary" @click="showText" style="width: 80px;height: 40px;margin-left: 30px">点击预览</el-button>
  </div>
</div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import {Detailscount, oneEU, queryListsmenu, queryMenu, updateMenu} from "../../network/request"; // ES6 Module
export default {
  name: "Release_Article_View",
  props:{
    //修改文章使用的
    titleName:String,
    applicationidTo:String,
  },
  components: {
    VueUeditorWrap
  },
  inject:['reload'],
  data() {
    return {
      msg: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>添加内容</h2>',
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: '400',
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'http://35.201.165.105:8000/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/static/UEditor/',
      },
      nowTime: '',
      NowTime:"",
      nowWeek: '',
      title: "",
      radio: "关闭",
      radio1:"热门",
      about1:"",
      about1url:"",
      about2:"",
      about2url:"",
      Details:"0",
      applicationid:"rootClaraTo365",
      radio1to: {
        type:Number,
      },
      updatetitleId:"",
      dialogVisible:false,
    }
  },
  methods:{
    currentTime () {
      setInterval(this.getDate, 500)
    },
    getDate () {
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
      const date = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
      const hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
      const mm = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
      const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
      const week = new Date().getDay()
      this.nowTime = year + '年' + month + '月' + date + '日' + ' ' + hh + ':' + mm + ':' + ss
      this.NowTime = year + '-' + month + '-' + date
      if (week === 1) {
        this.nowWeek = '星期一'
      } else if (week === 2) {
        this.nowWeek = '星期二'
      } else if (week === 3) {
        this.nowWeek = '星期三'
      } else if (week === 4) {
        this.nowWeek = '星期四'
      } else if (week === 5) {
        this.nowWeek = '星期五'
      } else if (week === 6) {
        this.nowWeek = '星期六'
      } else if (week === 7) {
        this.nowWeek = '星期日'
      }
    },
    butDetails() {
      this.reload();
    },
    butmsg() {
      if (this.msg===""||this.title===""||this.about1===""||this.about2===""&&this.radio1==="普通") {
        this.$alert('标题或内容不完整', '错误', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `undefined`
            });
          }
        });
      } else {
        if (this.radio1 === "热门") {
          this.radio1to = 0;
        }
        if (this.radio1 === "普通") {
          this.radio1to = 1;
        }
        if(this.about1!==""){if(this.about1url===""){this.$message.error("url不可为空");return false;}}
        if(this.about2!==""){if(this.about2url===""){this.$message.error("url不可为空");return false;}}
        const urlReg='[a-zA-z]+://[^s]*';
        let urlRe=new RegExp(urlReg);
        if(this.about1url){
          if(!urlRe.test(this.about1url)){
            this.$message.error("url格式错误");return false;
          }
        }
        if(this.about2url){
          if(!urlRe.test(this.about2url)){
            this.$message.error("url格式错误");return false;
          }
        }

        oneEU({
          url: "/addMenu",
          method:"post",
          params: {
            "menutitle": this.title,
            "menudate": this.NowTime,
            "titleid": Number(0),
            "info1": this.about1,
            "info1Url":this.about1url,
            "info2": this.about2,
            "info2Url":this.about2url,
            "rightto": Number(this.radio1to),
            "msg":this.msg,
            "applicationid":this.applicationid
          }
        }).then(res => {
          if(res.data===1){this.$message('发布成功');}else{  this.$message({
            message: '发布错误或已存在相同标题文章',
            type: 'warning'
          });}

        }).catch(err => {
        })
        this.reload();
      }
    },
    sendMenu(){
      queryMenu({
        url: "/querytitle/"+this.titleName+"/"+this.applicationidTo,
      }).then(res => {
       this.title=res.data.menutitle;
       this.msg=res.data.detailstext;
       this.about1=res.data.info1;
        this.about1url=res.data.info1Url;
       this.about2=res.data.info2;
        this.about2url=res.data.info2Url;
       this.radio="开启";
       this.updatetitleId=res.data.menuid;
       this.applicationid=res.data.applicationid;
       if(res.data.rightto){
         this.radio1="普通";
       }else{
         this.radio1="热门";
       }
      }).catch(err => {
        console.log(err)
      })
    },
    butupdate(){
      if(this.about1!==""){if(this.about1url===""){this.$message.error("url不可为空");return false;}}
      if(this.about2!==""){if(this.about2url===""){this.$message.error("url不可为空");return false;}}
      const urlReg='[a-zA-z]+://[^s]*';
      let urlRe=new RegExp(urlReg);
      if(this.about1url){
        if(!urlRe.test(this.about1url)){
          this.$message.error("url格式错误");return false;
        }
      }
      if(this.about2url){
        if(!urlRe.test(this.about2url)){
          this.$message.error("url格式错误");return false;
        }
      }
      console.log(this.updatetitleId)
      updateMenu({
        url:"/updateMenu",
        method:"POST",
        data: {
          "menuid":this.updatetitleId,
          "menutitle": this.title,
          "menudate": this.NowTime,
          "titleid": 0,
          "info1": this.about1,
          "info1Url":this.about1url,
          "info2": this.about2,
          "info2Url":this.about2url,
          "rightto": Number(this.radio1to),
          "detailstext":this.msg,
          "applicationid":this.applicationid,
          "Review":"yes"
        }
      }).then(res=>{
        if(res.data){
          this.$message('修改成功');
        }
      })
    },
    showText(){
        this.dialogVisible=true;
    }
  },
  mounted() {
    this.currentTime();
    Detailscount({
      url: "/QueryAllMenuCount"
    }).then(res => {
      this.Details = res.data;
    }).catch(err => {
      console.log(err)
    });
    if(this.titleName){
       this.sendMenu();
    }else{

    }
  },
  beforeDestroy: function () {
    if (this.getDate) {
      clearInterval(this.getDate) // 在Vue实例销毁前，清除时间定时器
    }
  }
}
</script>
<style scoped>
/deep/ .el-scrollbar__wrap {
  /*根据需求设置overflow*/
  overflow-x: hidden;
}
.grid-content {
  flex: 5;
  border-radius: 4px;
  min-height: 36px;
}
*{
  padding: 0;
  margin: 0;
}
.Clara{
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: center;
}
.left{
  display: flex;
}
.right{
  width: 70%;
  margin: 0 auto;
  height: 560px;
  padding-left: 10px;
}
.rightset{
 flex: 5;
  width: 100%;
  height: 120px;
  margin:10% auto;
  text-align: center;
}
.bottom h2{
  display: inline;
}
.bottom span{
padding-left: 15px;
}
.titleName{
  display: inline;
  padding-left: 20px;
 }
</style>
