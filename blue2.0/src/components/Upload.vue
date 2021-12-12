<template>
<div>
  <el-upload
    class="avatar-uploader"
    ref="upload"
    action="/"
    :on-change="onchange"
    :http-request="httpRequest"
    :before-upload="beforeAvatarUpload"
    :show-file-list="false">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="上传">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <div><el-button type="primary" @click="httpRequestTo" :disabled="isdisabled">点击上传</el-button></div>
  <!-- vueCropper 剪裁图片实现-->
  <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
    <div class="cropper-content">
      <div class="cropper" style="text-align:center">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="option.centerBox"
          :infoTrue="option.infoTrue"
          :fixedBox="option.fixedBox"
        ></vueCropper>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="cropper" :loading="loading">确认</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {uploadurl} from "../network/request";
import axios from "axios";
import store from "../srore";

export default {
  name: "Upload",
  data() {
    return {
      isdisabled:false,
      imageUrl: '',
      url:"",
      file:"",
      dialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [7, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [],  //页面显示的数组
      // 防止重复提交
      loading: false
    };
  },
  watch:{
    imageUrl:{
      handler:function (){

      }
    }
  },
  methods: {
    httpRequest(file){
        this.url=uploadurl
        this.file=file;
    },
    httpRequestTo(){
      this.dialogVisible = true;
      this.option.img = this.imageUrl;
    },
    cropper(){
      console.log(this.$refs.cropper.$data);
      this.loading = true;
      this.$refs.cropper.getCropBlob((data) => {
      let config = {
        header: {'Content-Type': 'multipart/form-data'},
        headers:{authorization: this.$store.getters.RetToken,}
      }
      let param = new FormData();
        let file = this.blobToFile(data, 'filename.jpg')
      param.append('file', file, file.name);
      param.append('userName', this.$store.getters.Retusername);
      let that = this;
      axios.post(  this.url, param, config).then((res) => {
        if(res.data==="ok"){
          this.$message.success("上传成功");
          this.loading = false;
          this.dialogVisible=false;
          let reader = new FileReader();
          let _this = this;
          reader.onload = function(e) {
            _this.imageUrl = e.target.result //将图片路径赋值给src
          }
          reader.readAsDataURL(file);
          this.$emit("uploadPop",true)
          return false;
        }
        this.$message.success("上传失败");
      })
      })
    },
    blobToFile(Blob, fileName) {  //兼容IE
      Blob.lastModifiedDate = new Date()
      Blob.name = fileName
      return Blob
    },
    onchange(file,fileList){
      let _this = this;
      let event = event || window.event;
       file = event.target.files[0];
      let reader = new FileReader();
      //转base64
      reader.onload = function(e) {
        _this.imageUrl = e.target.result //将图片路径赋值给src
      }
      reader.readAsDataURL(file);
  },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      this.isdisabled=false;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        this.isdisabled=true;
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        this.isdisabled=true;
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.cropper-content .cropper
 {
  width: auto;
  height:300px;
}
</style>
