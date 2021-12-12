<template>
  <div class="top">
    <el-row>
        <el-col :span="24"><div class="grid-content bg-purple">
          <div class="logo"  @click="indexbuts()"><h1><span style="color: #FB5353;">Clara</span></h1></div>
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"style="background-color: white">
            <div class="intbox">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="SearchDate" :class="{inputw:true}">
            </el-input>
             <button class="intbut" @click="Search()">检索</button>
            </div>
          </el-menu>
              <div class="Logindiv"><slot name="butindexlogin"></slot></div>
              <div><slot name="Login"></slot></div>
        </div>
        </el-col>
      </el-row>
  </div>
</template>
<script>
require("../assets/css/Top_media.scss")
export default {
  name: "Layout",
  inject:['reload'],
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      SearchDate:"",
    };
  },
  methods: {
    indexbuts(){
      this.$router.replace("/Clara");
    },
    Search(){
      if(this.SearchDate===""){
        this.$message({
          message: "检索内容不可为空",
          type: 'warning'
        });
      }else{
        this.$router.push({
          path:"Search_page",
          query:{
            SearchInfo:this.SearchDate,
          },
        })
        setTimeout(()=>{
          this.reload();
        },1)
      }
    }
  },
}
</script>
<style scoped>
.top{
  line-height: 49px;
  width: 100%;
  position: relative;
  margin: 0;
  z-index: 10;
}
.Logindiv{
  position: absolute;
  top: 0;
  background-color: Transparent;
  right: 8%;
  height: 49px;
  line-height: 49px;
  margin-top: 0.2%;
  color: black;
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.intbox{
  text-align: center;
  position: relative;
  width: 40%;
  margin-left: 20%
}
.intbut{
  height: 40px;
  width: 60px;
  background-color: black;
  color: white;
  position: absolute;
  right: 0;top: 6px;
  cursor: pointer;
  border-radius: 5px;
}
.intbut:hover{
  background-color: #FB5353;
}
.inputw{
  width:88%;
  transition:width 1s;
  -webkit-transition:width 1s; /* Safari */
  margin-right: 16%;
  margin-top: 0.5%;
}
img{
  width: 120px;
  height: 60px;
}
.logo{
  position: absolute;
  height: 60px;
  z-index: 2;
  padding-left: 1%;
  left: 0;
  margin-left: 2%;
  cursor: pointer;
}
</style>
