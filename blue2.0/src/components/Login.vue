<template>
<div>
  <div v-show="isshow" :class="{card:isLoginShowOpinion%2===0,card2:isLoginShowOpinion%2!==0,middle:true}">
    <input type="radio" name="r" id="t1"/>
    <input type="radio" name="r" id="t2"/>
    <input type="radio" name="r" id="t3"/>
    <input type="radio" name="r" id="t4"/>
    <div :class="{registerBox:isLoginShowOpinion%2===0,registerBox2:isLoginShowOpinion%2!==0}">
      <label for="t4" @click="closet4()">
        <svg t="1620034191579" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1128" width="16" height="16"><path d="M926.1 813.5L810.7 928.9 510.4 628.6 210.2 928.9 94.7 813.5 395 513.2 94.7 212.9 210.2 97.5l300.3 300.3L810.7 97.5 926.1 213 625.9 513.2l300.2 300.3z" fill="#060001" p-id="1129"></path></svg>
      </label>
      <h2>注&nbsp册</h2>
      <el-form label-position="top" label-width="80px">
        <el-form-item>
          <el-input style="width: 80%;margin-top: 10px" v-model="registerinfo.nickname" placeholder="昵称" @blur="TestNickName()"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 80%;margin-top: 10px" v-model="registerinfo.uname" placeholder="用户名" @blur="TestUname()"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 80%;margin-top: 10px" v-model="registerinfo.upwd" placeholder="密码" show-password @blur="Check_password()"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 80%;margin-top: 10px" v-model="registerinfo.repeatupwd" placeholder="重复密码" show-password @blur="Check_password()"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 80%;margin-top: 10px" v-model="registerinfo.uemile" placeholder="邮箱" @blur="TestUemile()"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" style="background-color: black; color: white;width: 60%;" @click="Submitregister()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="font">
      <div class="inputTable">
        <div style="margin: 20px;"><h2>用&nbsp户&nbsp登&nbsp陆</h2></div>
        <el-form label-position="top" label-width="80px">
          <el-form-item>
            <el-input style="width: 80%;margin-top: 20px" v-model="info.uname" placeholder="账号" @blur="TestLoginUname()"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 80%;margin-top: 20px" v-model="info.upwd" placeholder="密码" show-password @blur="TestLoginUpwd()"></el-input>
          </el-form-item>
          <label for="t1">忘记密码</label>
          <label for="t3">注册</label>
          <el-form-item size="large">
            <br>
            <el-button type="primary" style="background-color: black; color: white;width: 60%;" @click="Submit()">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="back">
      <div class="back-conten">
        <div class="inputTable2">
        <div style="margin: 20px;"><h2>忘&nbsp记&nbsp密&nbsp码</h2></div>
          <el-form label-position="top" label-width="80px">
            <el-form-item>
              <el-input style="width: 80%;padding-top: 20px" placeholder="账号" v-model="resetpwdinfo.uname" @blur="Testreset()"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input style="width: 50%;position: absolute;left: 40px" placeholder="邮箱" :disabled="isAble" @blur="sendVerification()" v-model="resetpwdinfo.uemile">
              </el-input><el-input style="width: 28%; margin-left: 52%" placeholder="验证码" v-model="resetpwdinfo.verificationCode"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input style="width: 60%; margin-top: 10px" placeholder="新密码" v-model="resetpwdinfo.upwd" show-password @blur="Check_password2()"></el-input>
              <el-input style="width: 60%; margin-top: 20px" placeholder="重复新密码" v-model="resetpwdinfo.repeatupwd" show-password @blur="Check_password2()"></el-input>
            </el-form-item>
            <label for="t2" class="backLogin">返回登录</label>
            <el-form-item size="large">
              <el-button type="primary" style="background-color: black; color: white;width: 60%;" @click="resetpwd()">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {demos} from "../network/request"
export default {
name: "Login",
  props:{
    isLoginShowOpinion:Number,
  },
  inject:['reload'],
  data(){
  return{
    info:{
        uname:"",
        upwd:""
    },
    registerinfo:{
        nickname:"",
        uname:"",
        upwd: "",
        repeatupwd:"",
        uemile:"",
    },
    user:{},
      resetpwdinfo:{
      uname:"",
      uemile:"",
      verificationCode:"",
      upwd: "",
      repeatupwd:"",
    },
    isAble:false,
    isCheck_password:false,
    isCheck_password2:false,
    isNickNmae:false,
    isUname:false,
    isUemile:false,
    isLoginUname:false,
    isLoginUpwd:false,
    isResUname:false,
    isshow:true
  }
  },
  methods:{
    TestNickName(){
        const NickNameReg  = "^[\u4e00-\u9fa5]{0,6}$";
         let NickNameRe = new RegExp(NickNameReg)
        if(NickNameRe.test(this.registerinfo.nickname)){
          this.isNickNmae=true;
        }else{
          this.$message({
            type: 'warning',
            message: '只能输入汉字且长度在6个字符以内',
          })
          this.isNickNmae=false;
        }
    },
    TestUname(){
      const UnameReg ='^[a-zA-Z][a-zA-Z0-9_]{4,8}$';
      let UnameRe=new RegExp(UnameReg);
      if(UnameRe.test(this.registerinfo.uname)){
          this.isUname=true;
      }else{
        this.$message({
          type: 'warning',
          message: '字母开头，允许5-9字节，允许字母数字下划线',
        })
        this.isUname=false;
      }
    },
    TestUemile(){
      const UemileReg="^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
      let UemileRe=new RegExp(UemileReg);
          if(UemileRe.test(this.registerinfo.uemile)){
            this.isUemile=true;
          }else{
            this.$message({
              type: 'warning',
              message: '请输正确的邮箱地址',
            })
            this.isUemile=false;
          }
    },
    TestLoginUname(){
      const LoginUnameReg ='^[a-zA-Z][a-zA-Z0-9_]{4,8}$';
      let LoginUnameRe=new RegExp(LoginUnameReg);
      if(LoginUnameRe.test(this.info.uname)){
        this.isLoginUname=true;
      }else{
        this.$message({
          type: 'warning',
          message: '字母开头，允许5-9字节，允许字母数字下划线',
        })
        this.isLoginUname=false;
      }
    },
    TestLoginUpwd(){
      const ULoginUpwdeg = /^[a-zA-Z]\w{5,17}$/;
      let ULoginUpwde=new RegExp(ULoginUpwdeg);
      if(ULoginUpwde.test(this.info.upwd)){
            this.isLoginUpwd=true;
      }else{
        this.$message({
          message:"密码要求:以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
          type: 'warning'
        });
        this.isLoginUpwd=false;
      }
    },
    Testreset(){
      const ResUnameReg ='^[a-zA-Z][a-zA-Z0-9_]{4,8}$';
      let ResUnameRe=new RegExp(ResUnameReg);
      if(ResUnameRe.test(this.resetpwdinfo.uname)){
        this.isResUname=true;
      }else{
        this.$message({
          type: 'warning',
          message: '字母开头，允许5-9字节，允许字母数字下划线',
        })
        this.isResUname=false;
      }
    },
    Submit(){
      if(this.isLoginUpwd&&this.isLoginUname) {
        //  this.info.upwd=this.$md5(this.info.upwd+"Asd12_qS");
        // console.log(this.info.upwd);
        demos({
          method: "post",
          url: "/Ulogin",
          data: this.info,
        }).then(res => {
          this.user = res.data;
          console.log(res.data)
          if (this.user.token === null) {
            console.log(res.data)
            this.$message.error("登陆失败 请检查信息");
            this.info.uname = "";
            this.info.upwd = "";
          } else {
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("sessionId",res.data.sessionId)
            this.$store.commit("LoginToken", this.user);
            this.user = res.data;
            this.$message({
              message: "欢迎您 亲爱的:" + this.info.uname,
              type: 'success'
            });
            if(this.$route.path==="/Details"||this.$route.path==="/404"){
              this.$router.replace('/')
              location.reload();
            }else{
              this.$router.replace(this.$route.path)
              location.reload();
            }
          }
          console.log(res.data);
        }).catch(err => {
          console.log(err);
        })
      }else{
        this.$message({
          message: "请检查信息",
          type: 'warning'
        });
      }
    },
    Submitregister() {
      if (this.registerinfo.nickname!==""&&this.registerinfo.uname!==""&&this.registerinfo.upwd!==""&&this.registerinfo.uemile!==""&&this.isCheck_password===true&&this.isNickNmae===true&&this.isUname===true) {
        if(this.registerinfo.upwd===this.registerinfo.repeatupwd&&this.isUemile===true) {
          const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
          if (regEmail.test(this.registerinfo.uemile)) {
            demos({
              method: "post",
              url: "/addUser",
              data: this.registerinfo,
            }).then(res => {
              if (res.data == 0) {
                this.$message({
                  message: "请检查信息 或有重复",
                  type: 'warning'
                });
              } else {
                this.$message({
                  message: "注册成功",
                  type: 'success'
                });
              }
            }).catch(err => {
              console.log(err);
            })
          } else {
            this.$message({
              type: 'warning',
              message: '请输正确的邮箱地址',
            })
          }
        }else{
          this.$message({
            message: "两次密码不一致",
            type: 'warning'
          });
        }
      }else{
        this.$message({
          message: "请检查信息",
          type: 'warning'
        });
      }
    },
    sendVerification(){
      if(this.resetpwdinfo.uname!==""&&this.resetpwdinfo.uemile!==""){
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (regEmail.test(this.resetpwdinfo.uemile)) {
         demos({
           method:"post",
           url:"/sendVerification",
           data:this.resetpwdinfo,
         }).then(res=>{
                  if(Number(res.data*1)===1) {
                    this.$message({
                      message: "验证码发送成功 30s后可重新发送",
                      type: 'success'
                    });
                    this.isAble=true;
                    setTimeout(()=>{
                      this.isAble=false;
                    },30000)
                  }else if(Number(res.data*1)===0){
                    this.$message({
                      message: "用户名不存在",
                      type: 'warning'
                    });
                  }else if(Number(res.data*1)<0){
                    this.$message({
                      message: "邮箱错误",
                      type: 'warning'
                    });
                  }
         }).catch(ree=>{

         })
        }else{
          this.$message({
            type: 'warning',
            message: '请输正确的邮箱地址',
          })
        }
      }else if(this.resetpwdinfo.uname.length===0){
        this.$message({
          message: "请输入账号名",
          type: 'warning'
        });
      }else{
        this.$message({
          message: "请输入邮箱",
          type: 'warning'
        });
      }
    },
    resetpwd(){
      if(this.resetpwdinfo.uname!==""&&this.resetpwdinfo.uemile!==""&&this.resetpwdinfo.upwd!==""&&this.resetpwdinfo.verificationCode!==""&&this.resetpwdinfo.repeatupwd!==""&&this.isCheck_password2===true&&this.isResUname){
        if(this.resetpwdinfo.upwd===this.resetpwdinfo.repeatupwd) {
          demos({
            method: "post",
            url: "/verification",
            data: this.resetpwdinfo,
          }).then(res => {
            if (res.data === true) {
              this.$message({
                message: "密码重置成功",
                type: 'success'
              });
              this.resetpwdinfo.uname = "";
              this.resetpwdinfo.uemile = "";
              this.resetpwdinfo.upwd = "";
              this.resetpwdinfo.verificationCode = "";
              this.resetpwdinfo.repeatupwd = "";
            } else {
              this.$message({
                message: "验证码错误",
                type: 'warning'
              });
            }
          }).catch(err => {

          })
        }else{
          this.$message({
            message: "两次密码不一致",
            type: 'warning'
          });
        }
        }else{
        this.$message({
          message: "检查信息",
          type: 'warning'
        });
      }
    },
    closet4(){
      this.registerinfo.uname="";
      this.registerinfo.nickname="";
      this.registerinfo.upwd="";
      this.registerinfo.uemile="";
      this.registerinfo.repeatupwd="";
    },
    // Check_passwordLogin(){
    //   const regPwd = /^[a-zA-Z]\w{5,17}$/;
    //   if (!regPwd.test(this.info.upwd)) {
    //     this.$message({
    //       message:"密码要求:以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
    //       type: 'warning'
    //     });
    //   }
    // },
    Check_password() {
      const regPwd = /^[a-zA-Z]\w{5,17}$/;
      if (regPwd.test(this.registerinfo.upwd)&&regPwd.test(this.registerinfo.repeatupwd)) {
        if (this.registerinfo.upwd !== this.registerinfo.repeatupwd) {
          this.$message({
            message: "两次密码不一致",
            type: 'warning'
          });
          this.isCheck_password=false;
        }else{
          this.isCheck_password=true;
        }
      }else{
        this.$message({
          message:"密码要求:以字母开头，长度在6~18之间，只能包含字母、数字和下划线000",
          type: 'warning'
        });
        this.isCheck_password=false;
      }
        },
          Check_password2() {
            const regPwd = /^[a-zA-Z]\w{5,17}$/;
            if (regPwd.test(this.resetpwdinfo.upwd)&&regPwd.test(this.resetpwdinfo.repeatupwd)) {
              if (this.resetpwdinfo.upwd !== this.resetpwdinfo.repeatupwd) {
                this.$message({
                  message: "两次密码不一致",
                  type: 'warning'
                });
                this.isCheck_password2=false;
              }else{
                this.isCheck_password2=true;
              }
            }else{
              this.$message({
                message:"密码要求:以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
                type: 'warning'
              });
              this.isCheck_password2=false;
            }
    }
  },
  watch:{
//       "isLoginShowOpinion":function(newVal){
//         setTimeout(()=>{
//           this.reload();
//         },100)
// },
  },
}
</script>
<style scoped>
body{
  color: transparent;
}
.registerBox{
  position: absolute;
  transform: perspective(600px) rotateY(90deg);
}
.registerBox2{
display: none;
}
.registerBox h2{
  padding-top: 20px;
}
.registerBox label{
  right: 20px;
  top: 0px;
  position: absolute;
}
input[name='r']{
  position: absolute;
  visibility: hidden;
}
.middle{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  background-color: white;
}
.card{
  width: 400px;
  height: 500px;
  cursor: pointer;
  transition: width .6s;
  animation:  s .6s linear;
  background-color: white;
  border-radius: 5px;
}
.card2{
  width: 400px;
  height: 0px;
  cursor: pointer;
  transition: width .6s;
  animation:  s2 .6s linear;
}
@keyframes s {
  from{height: 0}
  to{height: 500px}
}
@keyframes s2 {
  from{height: 500px}
  to{height: 0}
}
.inputTable{
  width: 100%;
  height: 100%;
  color: black;
}
.inputTable2{
  width: 100%;
  height: 100%;
  color: black;
}
label{
  cursor: pointer;
}
.font,.back{
  width: 100%;
  height: 100%;
  overflow: hidden;
  /**/
  backface-visibility: hidden;
  position: absolute;
  transition: transform .6s linear;
}
.font img{
  height: 100%;
  width: 100%;
  opacity: 0.0;
}
.back-conten{
  text-align: center;
  width: 100%;
}
.font{
  /**/
  transform: perspective(600px) rotateY(0deg);
}
.back{
  transform:perspective(600px) rotateY(180deg);
}
#t1:checked ~ .font{
  transform:perspective(600px) rotateY(-180deg);
}
#t1:checked ~ .back{
  transform:perspective(600px) rotateY(0deg);
}
#t3:checked ~ .registerBox{
  background-color: white;
  transition: all 2.0s;
  color: black;
  z-index: 10;
  width: 400px;
  height: 500px;
  position: absolute;
  left: -410px;
  border-right: 5px;
  transform: perspective(600px) rotateY(0deg);
}
#t4:checked ~ .registerBox{
  transform: perspective(600px) rotateY(-90deg);
}
</style>
