import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)
const store=new Vuex.Store({
  state: {
    ID:"",
    Token:"",
    nickname:"",
    userName:"",
  },
  mutations:{
      LoginToken(state,userinfo){
        state.Token=userinfo.token;
        state.ID=userinfo.uid;
        state.Nickname=userinfo.nickname;
        state.userName=userinfo.userName;
      //  state.username=userinfo.
        sessionStorage.setItem("token",userinfo.token);
        sessionStorage.setItem("ID",userinfo.uid);
        sessionStorage.setItem("Nickname",userinfo.nickname);
        sessionStorage.setItem("userName",userinfo.userName);

      },
  },
  getters:{
    RetToken(state){
      if(!state.Token)
      {
        state.Token=sessionStorage.getItem("token");
      }
      return state.Token;
    },
     RetUid(state){
       if(!state.ID)
       {
         state.ID=sessionStorage.getItem("ID");
       }
        return state.ID;
     },
    Retnickname(state){
      if(!state.nickname)
      {
        state.nickname=sessionStorage.getItem("Nickname");
      }
      return state.nickname;
    },
    Retusername(state){
      if(!state.userName)
      {
        state.userName=sessionStorage.getItem("userName");
      }
      return state.userName;
    },
  }
})
export default store
