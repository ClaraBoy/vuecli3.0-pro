<template>
  <div>
    <div class="container">
      <div class="comment-wrap">
        <div class="comment-add-wrap">
          <div class="comment-static-wrap">
            <div class="comment-user-profile">
              <div class="comment-user-controls">
                <button type="button" name="comment" class="comment-btn btn" @click="btnclick()">发送</button>
              </div>
            </div>
            <div class="comment-add-textarea">
              <textarea placeholder="留下你的痕迹" name="commentArea" v-model="Comment_text"  class="comment-area"/>
              <div class="comment-tooling-wrap">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-messages-wrap">
        <div class="comment-label-wrap">
          <span class="comment-label-text">{{Commentslength}} 评论</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Commentmessageput",
  props:{
    Commentslength:"",
  },
  data(){return{
    Comment_text:"",
  }},
  methods:{
    btnclick(){
      if(this.Comment_text===""){
        this.$message({
          message: '警告 内容为空',
          type: 'warning'
        });
      }else{
        this.$emit("categoriesclick",this.Comment_text);//发射事件
      }
    }
  },
  mounted() {

  }
}
</script>
<style scoped>
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
  width: 80%;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  margin: 10px auto;
}
/*Commenting Section ---*/
.comment-wrap {
  width: 100%;
  border-radius: 3px;
  box-shadow: 0px 18px 54px -30px rgba(0, 0, 0, 0.75);
  border: 1px solid #eee;
  background: linear-gradient(-45deg, rgba(255, 255, 255, 1) 0%, rgba(247, 247, 247, 1) 10%);
}

.comment-add-wrap {
  display: flex;
  flex-direction: row;
  padding: 10px;
  background-color: white;
}

.comment-static-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.comment-user-profile {
  height: 100%;
  width: 80px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin: 10px 0 10px 0;

}
.comment-user-controls {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.btn {
  border: 0;
  padding: 8px;
  border-radius: 3px;
  font-size: 12px;
  outline: none;
  margin-top: 5px;
  height: auto;
  cursor: pointer;
}


.comment-btn {
  background: black;
  color: white;
  position: relative;
}

.comment-btn::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: white;
  opacity: 0;
  transition: opacity 200ms ease-out;
}

.comment-btn:hover::before {
  opacity: 0.1;
}

.comment-add-textarea {
  width: 100%;
  margin: 10px 0 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.comment-area {
  min-width: 100%;
  max-width: 100%;
  max-height: 250px;
  padding: 10px;
  min-height: 110px;
  border-radius: 3px 3px 0 0;
  border: 1px solid lightgray;
  border-bottom: 0;
  background: #eee;
  outline: none;
  resize: none;
}

.comment-area:focus {
  background: white;
}

.comment-tooling-wrap {
  width: 100%;
  height: 30px;
  border-radius: 0 0 3px 3px;
  background: white;
  border: 1px solid lightgray;
}


/*Messages section ---*/

.comment-messages-wrap {
  height: auto;
  width: 100%;
  background: white;
  margin: 10px 0 0 0;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.comment-label-wrap {
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0 15px 0;
  border-bottom: 1px solid black;
}

.comment-label-text {
  font-weight: bold;
  font-size: 14px;
  color: #3d3d3d;
}
</style>
