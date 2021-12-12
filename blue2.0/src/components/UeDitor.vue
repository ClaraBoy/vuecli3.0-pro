<template>
<div class="ue_warp">
  <div class="left"><vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap></div>
  <div class="right">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
      <el-form-item>
        暂不支持图片上传功能
      </el-form-item>
      <el-form-item label="当前日期">
        <span>{{nowTime}}</span>
        <span>{{nowWeek}}</span>
      </el-form-item>
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章相关一" prop="about">
        <el-input v-model="ruleForm.about1"></el-input>
      </el-form-item>
      <el-form-item label="文章相关二" prop="about1">
        <el-input v-model="ruleForm.about2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="dialogVisible=true">预览</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-dialog
    title="文章预览"
    :visible.sync="dialogVisible"
    fullscreen modal :close-on-click-modal="false">
    <div class="grid-content bg-purple-light">
      <h2 style="text-align: center">标题:{{ruleForm.title}}</h2>
      <br>
      <div class="right">
        <el-scrollbar style="height:100%;">
          <div v-html="msg"></div>
        </el-scrollbar>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import {applicationCon} from "../network/request";
import store from "../srore";
export default {
  name: "UeDitor",
  inject:['reload'],
  components: {
    VueUeditorWrap
  },
  data(){
    return {
      msg:"您的新文章",
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
      ruleForm: {
        title: "",
        NowTime:"",
        about1:"",
        about2:"",
        applicationid:"",
      },
      nowTime:"",
      nowWeek:"",
      dialogVisible:false,
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        about1: [
          { required: true, message: '请输入相关一', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        about2: [
          { required: true, message: '请输入相关二', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],

      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
           applicationCon({
             url:"/addMenu",
             method:"POST",
             params: {
               "menutitle": this.ruleForm.title,
               "menudate": this.ruleForm.NowTime,
               "titleid": Number(0),
               "info1": this.ruleForm.about1,
               "info2": this.ruleForm.about2,
               "rightto": Number(1),
               "msg":this.msg,
               "applicationid":this.$store.getters.Retusername
             }
           }).then(res => {
             if(res.data===1){this.$message('发布成功 等待管理员审核');}else{  this.$message({
               message: '发布错误或已存在相同标题文章',
               type: 'warning'
             });}

           }).catch(err => {
           })
          this.reload();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
      this.ruleForm.NowTime = year + '-' + month + '-' + date
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
    currentTime () {
      setInterval(this.getDate, 500)
    },
  },
  mounted() {
    this.currentTime();
  },
  beforeDestroy: function () {
    if (this.getDate) {
      clearInterval(this.getDate) // 在Vue实例销毁前，清除时间定时器
    }
  }
}
</script>

<style scoped>
.ue_warp{
  display: flex;
  width: 100%;
}
.ue_warp .left{
  display: flex;
  flex: 8;
  width: 100%;
}
/deep/ .el-scrollbar__wrap {
  /*根据需求设置overflow*/
  overflow-x: hidden;
}
.right{
  height: 560px;
  display: flex;
  justify-content: center;
  flex: 5;
  width: 60%;
  text-align:center;
  margin-top: 8%;
}
</style>
