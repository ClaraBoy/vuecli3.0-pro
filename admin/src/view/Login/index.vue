<template>
<div>
  <div v-if="!this.$store.getters.getToken">
<div class="Box_wrap">
  <div class="dowebok">
    <div class="logo">登陆</div>
    <span class="msg">{{ msg }}</span>
    <el-form label-position="right" label-width="80px" size="medium">
      <el-form-item label="账号">
        <el-input class="e-in" v-model="adminInfo.adminName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input class="e-in" type="password" v-model="adminInfo.adminpwd"></el-input>
      </el-form-item>
    </el-form>
      <div class="form-item"><button id="submit" @click="submit">登 录</button></div>
  </div>
  </div>
  </div>
  <div v-else class="success">
    <h3>欢迎进入
      <span>{{this.$store.getters.getName}}</span>
      <span>上次登陆:&nbsp;{{this.$store.getters.getLastTime}}</span>
    </h3>
  </div>
  </div>
</template>

<script>
import {oneEU} from "../../network/request";

export default {
  name: "index",
  data(){
    return{
      adminInfo:{
        adminName:"",
        adminpwd:"",
      },
      msg:""
    }
  },
  methods:{
    submit(){
      if(this.adminInfo.adminName&&this.adminInfo.adminpwd){
       oneEU({
              url:"/adminLogin",
              method:"POST",
              data:this.adminInfo,
       }).then(res=>{
         if(res.data.token!==null){
            this.$store.commit("LoginToken",res.data);
            this.$router.go(0);
            return false;
         }else{
                this.$message.error("信息错误");
         }
       })
      }
    }
  }
}
</script>

<style scoped>
.Box_wrap{
  width: auto;
  height: 100%; background: #fff 50% 50% no-repeat; background-size: cover;
}
.dowebok { position: absolute; left: 50%; top: 50%; width: 430px; height: 550px; margin: -300px 0 0 -215px; border: 1px solid #000000; border-radius: 20px; overflow: hidden;}

.logo { width: 120px; height: 40px; margin: 50px auto 80px; font-size: 32px; color: black ;text-align: center}

.form-item { position: relative; width: 360px; margin: 0 auto; padding-bottom: 30px; display: flex;align-items: center;}

.e-in { width: 288px; height: 48px; outline: none;}

.form-item button { width: 360px; height: 50px; border: 0; border-radius: 25px; font-size: 18px; color: white; outline: none; cursor: pointer; background-color: #000000; }

.reg-bar a { color: #fff; text-decoration: none; }

.reg-bar a:hover { text-decoration: underline; }

.reg-bar .reg { float: left; }

.reg-bar .forget { float: right; }

.dowebok ::-webkit-input-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}

.dowebok :-moz-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}

.dowebok ::-moz-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}

.dowebok :-ms-input-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
.msg{
  text-align: center;
  color: red;
  display: block;
  width: 100%;
  height: 40px;
  margin-bottom: 30px;
}


@media screen and (max-width: 500px) {

  * { box-sizing: border-box; }

  .dowebok { position: static; width: auto; height: auto; margin: 0 30px; border: 0; border-radius: 0; }

  .logo { margin: 50px auto; }

  .form-item { width: auto; }

  .form-item input, .form-item button, .reg-bar { width: 100%; }

}
.success{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
}
.success span{
  padding-left: 10px;
}
</style>
