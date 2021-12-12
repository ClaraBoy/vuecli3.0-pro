<template>
  <div>
<div style="width: 100%;height:auto;position: relative;">
<!--  <div class="loading" v-show="switchShow">{{ PASDmsg }}</div>-->
  <div style="overflow: hidden;height:640px;width: 640px;">
  <div style="height: 640px;overflow-y: scroll" class="infinite-list" v-infinite-scroll="ppp">
  <div class="page-scroller">
    <div class="list-wrapper" v-for="item in menus">
      <div class="pa">
        <div><Avatar/></div>
        <h3>您的文章</h3>
        <br>
        <span style="position: absolute;right: 60px;top: 30px;display: inline-block;cursor: pointer" @click="creation">发布文章</span>
      </div>
      <ul class="list" v-for="(item2) in item" style="overflow: hidden">
        <li :id="'li'+item2.menuid" class="liFF6B6B" @mousemove="mo(item2.menuid)" @click="poperate(item2.menuid)">
          <h3>{{ item2.menutitle }}</h3>
          <span @click="updateI(item2.menuid)" style="position: absolute;right: 180px;bottom: 5px">修改</span>
          <span @click="deleteI(item2.menuid)" style="position: absolute;right: 120px;bottom: 5px">删除</span>
          <span v-if="item2.review==='no'" style="position: absolute;right: 60px;bottom: 5px">审核中</span>
          <span v-else style="position: absolute;right: 60px;bottom: 5px">已发布</span>
          <br>
          <p>{{ item2.menudate }}</p>
        </li>
      </ul>
    </div>
  </div>
  </div>
</div>
</div>
</div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import {applicationCon} from "../../network/request";
import Avatar from "../../components/Avatar";
export default {
  name: "PASD",
  inject:['reload'],
  components:{
    Avatar
  },
  props:{
    menus:""
  },
  data(){
    return{
      PASDmsg:"",
      dialogVisiblep:false,
      isactive:false,
      isa:false,
      total:Number,
      start:1,
      end:8,
      Menu:{list:[{}]},
    }
  },
  methods:{
    queryMenu(){
      this.isswitchShow=true;
      applicationCon({
        url:"/queryMenu/"+this.$store.getters.Retusername+"/"+this.start+"/"+this.end,
        method:"GET",
      }).then(res=>{
        if(this.Menu.list.length-1===0){
          this.Menu.list=res.data;
        }else{
          res.data.forEach((keys,value)=>{
            this.Menu.list.push(keys);
          })
        }
      })
    },
    creation(){
      this.$emit("creation");
    },
    deleteI(id){
      this.$confirm('是否确认发布, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        applicationCon({
          url:"/deleteAppMenu/"+id,
          method:"POST",
        }).then(res=>{
          if(res) this.$message.success("删除成功");
          this.reload();
        })
      })

    },
    ppp(){
      this.$emit("load");
     // this.Fuck_You();
    },
    querytotal(){
      applicationCon({
        url:"/total/"+this.$store.getters.Retusername,
        method:"GET",
      }).then(res=>{
        this.total=res.data;
      })
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
    mo(id){
      this.$emit("echart",id)
    },
    poperate(id){

    },
    updateI(id){
      this.$emit("updateI",id)
    }
  },
  mounted() {
    // this.queryMenu();
    // this.querytotal();
  }
}
</script>

<style>
.page-scroller{
  height: 100%;
}
.pa {
  background-color: black;
  width: 100%;
  padding: 10px 10px;
  height: 80px;
  z-index: 60;
  position: relative;
}
.pa h3{
  position: absolute;
  left: 90px;
  top: 30px;
}
li{
  width: 100%;
  padding: 15px 15px;
  height: 80px;
  border-top: 1px solid rgba( 255, 255, 255, 0.5 );
  list-style: none;
}
li a{
  color: white;
  text-decoration: none;
}
.list-wrapper{
  height: 95%;
}
.liFF6B6B {
background-color: #556270;
  cursor: pointer;
  z-index: 100;
}
/deep/ .el-scrollbar__wrap {
  /*根据需求设置overflow*/
  overflow-x: hidden;
}
.loading{
  position: absolute;
  background-color:rgba(255,255,255,0.1);
  color: #ccc;
  height: 60px;
  line-height: 60px;
  width: 100%;
  text-align: center;
  z-index: 50;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  transition: all 0.3s;
}
.list{
  position: relative;
}
</style>
