<template xmlns="http://www.w3.org/1999/html">
  <div>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea" v-model="msg"/>
    <!--    <div class="editor-custom-btn-container">-->
    <!--      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />-->
    <!--    </div>-->
  </div>
    <div>
      <div>
        <div class="right">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
            <el-form-item>
              <h3 @click="manage" style="cursor: pointer">我的文章</h3>
              <br>
              暂不支持图片上传功能
              &nbsp;&nbsp;
              仅支持图片链接引用
            </el-form-item>
            <el-form-item label="当前日期">
              <span>{{nowTime}}</span>
              <span>{{nowWeek}}</span>
            </el-form-item>
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="ruleForm.title" :readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="文章相关一" prop="about1">
              <el-input v-model="ruleForm.about1"></el-input>
            </el-form-item>
            <el-form-item label="相关URL" prop="about1url">
              <el-input v-model="ruleForm.about1url"></el-input>
            </el-form-item>
            <el-form-item label="文章相关二" prop="about2">
              <el-input v-model="ruleForm.about2"></el-input>
            </el-form-item>
            <el-form-item label="相关URL" prop="about2url">
              <el-input v-model="ruleForm.about2url"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" v-if="!readonly">立即发布</el-button>
              <el-button type="primary" @click="submitFormupdate('ruleForm')" v-else>修改</el-button>
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
            <h2 style="text-align: center">{{ruleForm.title}}</h2>
            <br>
            <div class="righttitle">
              <el-scrollbar style="height:100%;">
                <div v-html="msg"></div>
              </el-scrollbar>
            </div>
          </div>
        </el-dialog>
        <el-dialog
          title="封面上传"
          :visible.sync="dialogVisibleload"
           modal :close-on-click-modal="false">
          <div class="grid-content bg-purple-light">
            <h4>封面只能上传一次</h4>
                <Upload1 :titleName="ruleForm.title"/>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import editorImage from './components/EditorImage'
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
import {applicationCon} from "../../network/request";
import Upload1 from "../Upload1";

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'

export default {
  name: 'Tinymce',
  inject:['reload'],
  components: { editorImage,Upload1 },
  props: {
    menu:{
      type:"",
      default:null,
    },
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data() {
    return {
      dialogVisibleload:false,
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja'
      },
      ruleForm: {
        id:"",
        title: "",
        NowTime:"",
        about1:"",
        about1url:"",
        about2:"",
        about2url:"",
        applicationid:"",
      },
      msg:"",
      nowTime:"",
      nowWeek:"",
      dialogVisible:false,
      readonly:false,
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 19, message: '长度在 3 到 19 个字符', trigger: 'blur' }
        ],
        about1: [
          { required: true, message: '请输入相关一', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        about1url: [
          { required: true, message: '请输入相关一URL', trigger: 'blur' },
          { trigger: 'blur' }
        ],
        about2: [
          { required: true, message: '请输入相关二', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        about2url: [
          { required: true, message: '请输入相关二URL', trigger: 'blur' },
          { trigger: 'blur' }
        ],

      },

    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    },
    menu:{
      handler:function (){
        this.readonly=true;
        this.ruleForm.id=this.menu.menuid;
        this.ruleForm.title=this.menu.menutitle;
        this.ruleForm.about1=this.menu.info1;
        this.ruleForm.about1url=this.menu.info1Url;
        this.ruleForm.about2=this.menu.info2;
        this.ruleForm.about2url=this.menu.info2Url;
        if(this.menu.detailstext!==undefined){
          window.tinymce.get(this.tinymceId).setContent(this.menu.detailstext);
        }else{
          this.readonly=false;
          window.tinymce.get(this.tinymceId).setContent("欢迎使用本网站");
        }
      },
      deep: true
    }
  },
  mounted() {
      this.init("");
      this.currentTime();
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    manage(){
      this.$emit("manage");
    },
    init(value) {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce(value)
      })
    },
    initTinymce(value) {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList['zh'],
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
       // imagetools_toolbar:"",
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.msg=editor.getContent();
           // this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        convert_urls: false
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      arr.forEach(v => window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`))
    },
    submitFormupdate(formName) {
      const urlReg='[a-zA-z]+://[^s]*';
      let urlRe=new RegExp(urlReg);
      if(this.ruleForm.about1url){
        if(!urlRe.test(this.ruleForm.about1url)){
          this.$message.error("url格式错误");return false;
        }
      }
      if(this.ruleForm.about2url){
        if(!urlRe.test(this.ruleForm.about2url)){
          this.$message.error("url格式错误");return false;
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认修改, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            applicationCon({
              url:"/updateAppMenu",
              method:"POST",
              params: {
                "menuid":this.ruleForm.id,
                "menutitle": this.ruleForm.title,
                "menudate": this.ruleForm.NowTime,
                "titleid": 0,
                "info1": this.ruleForm.about1,
                "info1Url":this.ruleForm.about1url,
                "info2": this.ruleForm.about2,
                "info2Url":this.ruleForm.about2url,
                "rightto": Number(1),
                "msg":this.msg,
                "applicationid":this.$store.getters.Retusername
              }
            }).then(res => {
              if(res.data===1){
                this.$message('修改成功 等待管理员审核');
                this.reload();
              }else{
                this.$message({
                message: '发布错误或已存在相同标题文章',
                type: 'warning'
              });}

            }).catch(err => {
            })
            this.reload();
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitForm(formName) {
      const urlReg='[a-zA-z]+://[^s]*';
      let urlRe=new RegExp(urlReg);
      if(this.ruleForm.about1url){
        if(!urlRe.test(this.ruleForm.about1url)){
          this.$message.error("url格式错误");return false;
        }
      }
      if(this.ruleForm.about2url){
        if(!urlRe.test(this.ruleForm.about2url)){
          this.$message.error("url格式错误");return false;
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认发布, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            applicationCon({
              url:"/addMenu",
              method:"POST",
              params: {
                "menutitle": this.ruleForm.title,
                "menudate": this.ruleForm.NowTime,
                "titleid": Number(0),
                "info1": this.ruleForm.about1,
                "info1Url":this.ruleForm.about1url,
                "info2": this.ruleForm.about2,
                "info2Url":this.ruleForm.about2url,
                "rightto": Number(1),
                "msg":this.msg,
                "applicationid":this.$store.getters.Retusername
              }
            }).then(res => {
              if(res.data===1){
                this.$message('发布成功 等待管理员审核');
                //this.reload();
                this.$confirm('是否要上传封面, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                }).then(()=>{
                  this.dialogVisibleload=true;
                })
              }else{  this.$message({
                message: '发布错误或已存在相同标题文章',
                type: 'warning'
              });}

            }).catch(err => {
            })
            //this.reload();
          })

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
  beforeDestroy: function () {
    if (this.getDate) {
      clearInterval(this.getDate) // 在Vue实例销毁前，清除时间定时器
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
.right{
  z-index: 5;
  position: absolute;
  top: 10px;
  height: 560px;
  display: flex;
  justify-content: center;
  width: 60%;
  text-align:center;
  margin-top: 8%;
  right: -53%;
}
.righttitle{
  height: 540px;
  margin: 0 auto;
  width: 60%;
}
/deep/ .el-scrollbar__wrap {
  /*根据需求设置overflow*/
  overflow-x: hidden;
}
</style>
