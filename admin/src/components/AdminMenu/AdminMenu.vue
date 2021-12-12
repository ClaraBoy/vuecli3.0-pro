<template>
<div>
  <div>
  <div class="top-wrap" v-if="this.$store.getters.getToken">
    <div class="title">
      Clara Write后台管理系统
      <span @click="outLogin">退出登录</span>
    </div>
  </div>
  <div style="clear: both"></div>
  <div class="box">
  <div class="content1" v-if="this.$store.getters.getToken">
    <el-row class="tac">
      <el-col>
        <el-menu
          @open="handleOpen"
          @select="handleSelect"
          style="position: fixed; top: 61px;bottom:0;max-width: 200px;min-width: 200px;"
        >
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">文章管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="Release_Article">发布文章</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="Release_UpData">修改文章</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="Release_Delete">删除文章</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-comment"></i>
              <span slot="title">评论管理</span>
            </template>
            <!--        <el-menu-item-group>-->
            <!--          <span slot="title">查看</span>-->
            <!--          <el-menu-item index="BasicData">基本流量</el-menu-item>-->
            <!--        </el-menu-item-group>-->
            <el-menu-item-group title="评论">
              <el-menu-item index="CommentData">评论查看</el-menu-item>
              <!--          <el-menu-item index="CommentAudit">审核结果</el-menu-item>-->
            </el-menu-item-group>
            <!--        <el-menu-item-group title="主页配置">-->
            <!--          <el-menu-item index="IndexConfig">条件设置</el-menu-item>-->
            <!--        </el-menu-item-group>-->
          </el-submenu>
          <el-menu-item index="sing_to" @click="dialog=true">
            <i class="el-icon-sunny"></i>
            <span slot="title">今日签到</span>
          </el-menu-item>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="UsersManagement">用户审核</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="UserArticle">文章审核</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>







  <div class="content2">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</div>
  </div>
  <el-dialog title="今日签到" :visible.sync="dialog" modal :close-on-click-modal="false">
    <div class="song">
      <el-input class="inputSong" v-model="songurl"/>
      <el-button class="btnSong" type="primary" @click="songUrlTo">上传</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {oneEU} from "../../network/request";
export default {
name: "AdminMenu",
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isCollapse: true,
      isRouterAlive: true,
      dialog:false,
      songurl:""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(keyPath);
    },
    handleSelect(key, keyPath) {
      this.$router.replace("/"+key);
    },
    reload () {
      this.isRouterAlive = false;            //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true;         //再打开
      })
    },
    songUrlTo(){
      if(this.songurl){
        const urlReg='[a-zA-z]+://[^s]*';
        let urlRe=new RegExp(urlReg);
        if(urlRe.test(this.songurl)){
          oneEU({
            url:"/addSongUrl?songurl="+this.songurl,
          }).then(res=>{
            alert(res.data)
            this.dialog=false;
          })
        }else{
          this.$message({
            type: 'warning',
            message: '请输入正确的url',
          })
        }
      }else{
        this.$message({
          type: 'warning',
          message: 'url为空',
        })
      }
    },
    outLogin(){
      this.$confirm('此操作将退出, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          localStorage.clear();
          this.$router.go(0);
      })
    }
  },
  mounted() {
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
  }
}
</script>
<style scoped>
*{
  padding: 0;
  margin: 0;
}
.box{
  display: flex;
}
.content1{
  flex: 1.2;
  height: 600px;
}
.content2{
  height: 600px;
  right: 0;
  flex: 7;
}
.song{
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 10px 10px 10px 10px ;
}
.song .inputSong{
  flex: 8;
  margin-right: 10px;
}
.song .btnSong{
  height: 30px;
  flex: 2;
}
.top-wrap{
  background-color: white;
  line-height: 60px;
  color: black;
  width: 100%;
  height: 60px;
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.title span{
  font-size:20px ;
  position: absolute;
  right: 60px;
  cursor: pointer;
}
</style>
