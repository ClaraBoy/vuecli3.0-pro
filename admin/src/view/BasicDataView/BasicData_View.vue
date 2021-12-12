<template>
<div>
<!--  <div class="Clara">-->
<!--    <div class="Lever">-->
<!--      <div class="Lever_left"><Basic/></div>-->
<!--      <div class="Lever_right">-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="Run">-->
<!--      <div class="Run_left"><Active_User/></div>-->
<!--      <div class="Run_mid"><Hotspot/></div>-->
<!--      <div class="Run_right">-->
<!--        <div class="Run_right_top"><Browse_Number/></div>-->
<!--        <div class="Run_right_bottom"><CommentNumber/></div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</div>
</template>

<script>
import Basic from "./Part/Basic";
import CommentNumber from "./Part/Comment_Number";
import Active_User from "./Part/Active_User";
import Hotspot from "./Part/Hotspot";
import Browse_Number from "./Part/Browse_Number";
export default {
  name: "BasicData_View",
 components:{
    Basic,
   CommentNumber,
   Active_User,
   Hotspot,
   Browse_Number
 },
  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style scoped>
.el-calendar-table .el-calendar-day {
  height: 30px;
}
.Clara{
  width: 100%;
  background-color: red;
  height: 100%;
  color: white;
  margin: 0 auto;
}
.Lever{
  flex: 1;
  height: 50%;
  width: 100%;
  background-color: blue;
  display: flex;
  position: fixed;
  top: 0;
}
.Lever_left{
background-color: #00a0e9;
  width: 50%;
}
.Lever_right{
  background-color: #151414;
  width: 50%;
  color: black;
}
.Run{
  flex: 1;
  background-color: #F0AC6B;
  height: 50%;
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 0;
}
.Run_left{
  background-color: #1c1c1c;
  width: 33%;
}
.Run_mid{
  background-color: #8313d0;
  width: 33%;
}
.Run_right{
  background-color: #24ab24;
  width: 33%;
  position: relative;
}
.Run_right_top{
  height: 50%;
  width: 100%;
  background-color: #fff5d4;
  position: absolute;
}
.Run_right_bottom{
  height: 50%;
  width: 100%;
  background-color: #6ce26c;
  bottom: 0;
  position: absolute;
}
</style>
