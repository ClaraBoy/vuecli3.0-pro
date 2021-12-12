<template>
<div>
<div class="mess">
  <span class="sp1">404</span><span class="sp2">页面跑丢了...</span>
  <span class="sp3" @click="backindex()">返回首页</span>
  <div class="booblack">
    <div class="wf"></div>
    <div class="wf2"></div>
    <div class="sboo"></div>
    <div class="boored"></div>
  </div>
</div>
</div>
</template>
<script>
export default {
name: "404.vue",
  methods:{
  backindex(){
   this.$router.replace("Clara_Write");
  }
  },
  mounted() {
    document.body.style.overflow='hidden';
  }
}
</script>

<style scoped>
.mess{
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 600px;
}
.sp1{
  font-size: 80px;
}
.sp2{
  padding-left: 30px;
  font-size: 35px;
}
.sp3{
  position: absolute;
  margin-top: 130px;
  font-size: 16px;
  cursor: pointer;
  left: 250px;
  height: 40px;
  width: 100px;
  background-color: black;
  color: white;
  line-height: 40px;
  text-align: center;
  transition: all .1s;
}
.sp3:hover{
  box-shadow: red;
  box-shadow: 10px 10px 5px #888888;
  left: 248px;
  margin-top: 128px;
}
.booblack{
  top: -15px;
  position: relative;
  width: 50px;
  height: 50px;
  background-color: #404040;
  right: 0;
  border-radius: 60px;
  position: absolute;
}
.wf{
  width: 5px;
  height: 50px;
  position: absolute;
  background-color: #404040;
  left: -65px;
  top: 60px;
  border-radius: 5px;
}
.wf2{
  width: 105px;
  height: 5px;
  position: absolute;
  background-color: #404040;
  left: -80px;
  top: 162px;
  border-radius: 5px;
  animation:swf 2s linear 1s infinite alternate;
}
.sboo{
  width: 10px;
  height: 10px;
  background-color: #404040;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  border-radius: 5px;
  animation:  ss 5s infinite linear;
  z-index: -30;
}
.boored{
  width: 60px;
  height: 60px;
  background-color: #FB5353;
  position: absolute;
  z-index: -20;
  border-radius: 60px;
  left: 50%;
  transform: translate(-60%);
  transform-origin:bottom;
  bottom: -80px;
}
@keyframes ss {
  0% {
    top: 0;
  }
  33.3%{
    top: 75px;
    left: -60px;
  }
  66.6%{
    top: 150px;
    left: 40px;
  }
  99.9% {
    top: 0;
  }
}
@keyframes swf {
  0% {
    transform: translate(0px, -10px);
  }
  100%{
    left: 60px;

  }
}
</style>
