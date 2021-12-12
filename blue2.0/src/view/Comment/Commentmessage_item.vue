<template>
<div>
  <br>
  <div class="container">
      <div class="comment-messages-list">
        <div class="comment-message-message">
          <div class="comment-message-body">
            <div class="comment-message-details">
              <span class="message-details-sender">{{items.topicname}}</span>
              <span class="message-details-time" >{{items.topicdate}}</span>
              <button class="but" @click="openDialog(items.topicname,items.topicred)" >回复</button>
            </div>
            <div class="comment-message-text">
              <p>{{items.topictext}}</p>
            </div>
            <div v-for="(item,index) in RepleComments" style="margin-left: 40px;">
              <div v-show="items.topicred===item.touid">
                <br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.commentname}} : {{item.repletext}}
<!--                <el-button type="primary" style="width: 60px;height: 20px; background-color: white;color: black;border: 0" @click="but(item.commentname,item.touid)" v-show="item.commentname.toString()!=$store.getters.Retnickname">回复</el-button>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <div>
    <el-dialog title="回复" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="5" v-model="repleinfo.repletext" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" style="width: 80px;height: 50px">取 消</el-button>
        <el-button type="primary" @click="butreple()" style="width: 80px;height: 50px;background-color: black" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
  </div>
</template>
<script>
export default {
name: "Commentmessage",
  props:{
    items:"",
    RepleComments:"",
    nickname:""
  },
  data(){
return{
  dialogFormVisible:false,
  formLabelWidth: '60px',
  repleinfo:{
    commentname:this.$store.getters.Retnickname,//回复人
    replename:"",//给谁的回复
    repleType:0,//回复的类型
    repletitle:"",//哪一篇文章
    fromusid:this.$store.getters.RetUid,
    touid:"",//根
    repletext:"",//内容
    applicationid:""
  },
  fname:[],
  rname:[]
}
  },
  methods:{
    openDialog(nickname,topicred){
      // if(nickname===this.$store.getters.Retnickname) {
      //   this.$message({
      //     message: '不能向自己回复',
      //     type: 'warning'
      //   });
    //  }else{
        this.repleinfo.replename=nickname;
        this.repleinfo.touid=topicred;
        this.dialogFormVisible=true;
     // }
      // this.$message({
      //         message: '此功能改进中  敬请期待！',
      //         type: 'warning'
      //       });
    },
    butreple(){
      this.dialogFormVisible=false;
      if(this.repleinfo.repletext===""){
        this.$message({
          message: '内容为空',
          type: 'warning'
        });
      }else {
        this.$emit("reple",this.repleinfo);//发射事件
      }
    },
    but(commentname,touid){
    //  if(commentname.toString()===this.$store.getters.Retnickname){
    //     this.$message({
    //       message: '不能给自己回复',
    //       type: 'warning'
    //    });
    //  }else{
        this.repleinfo.replename=commentname;
        this.repleinfo.touid=touid;
        this.dialogFormVisible=true;
   //  }
    },
  },
  computed:{
    // username(){
    //   for(let i=0;i<this.nickname.length;i++){
    //       return this.nickname[i].nickname;
    //   }
    // },
    fromusname(){
      for(let s=0;s<this.RepleComments.length;s++){
      for(let i=0;i<this.nickname.length;i++){
        if(this.nickname[i].uid.toString()===this.RepleComments[s].fromusid.toString())
        {
          this.fname.push(this.nickname[i].nickname);
        }
      }
     }
    },
    replename(){
      // for(let s=0;s<this.RepleComments.length;s++){
      // for(let i=0;i<this.nickname.length;i++){
      //     if(this.nickname[i].uid.toString()===this.RepleComments[s].repleid.toString())
      //     {
      //       this.rname.push(this.nickname[i].nickname) ;
      //     }
      //   }
      // }
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.but{
  line-height: 20px;
  height: 20px;
  background: white;
  margin-left: 60%;
  font-family:Webdings;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  right: 10px;
}
.but:hover{
  color: black;
}
p{
  text-indent:2em;
  line-height:25px
}
/*Base css ---*/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

body,
html {
  height: 100%;
  width: 100%;
  background: lightgray;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.container {
  /*Responsive on all sizes ---*/
  height: auto;
  width: 70%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  margin: 0 auto;
}
.comment-messages-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.comment-message-message {
  position: relative;
  height: auto;
  min-height: 80px;
  width: 100%;
  background: white;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
  display: flex;
  padding: 5px;
  flex-direction: row-reverse;
  flex-shrink: 0;
  box-shadow: 0px 18px 54px -30px rgba(0, 0, 0, 0.30);
}

.comment-message-message:hover::before {
  opacity: 1;
}

.comment-message-message:last-child {
  border: 0;
  box-shadow: none;
}
.comment-message-body {
  width: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.comment-message-details {
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.message-details-sender {
  font-weight: bold;
  font-size: 14px;
  width: 10%;
}

.message-details-time {
  color: gray;
  font-size: 12px;
  width: 40%;
  padding-left: 20px;

}

.comment-message-text {
  width: 100%;
  padding-top: 10px;
  color: #1c1c1c;
  margin-bottom: 5px;
  padding-left: 8%;
}
</style>
