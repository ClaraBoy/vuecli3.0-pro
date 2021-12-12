import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)
const store = new Vuex.Store({
      state:{
        token:"",
        name:"",
        lastTime:""
      },
      mutations:{
          LoginToken(state,adminInfo){
              localStorage.setItem("token",adminInfo.token);
              localStorage.setItem("name",adminInfo.name);
              localStorage.setItem("lastTime",adminInfo.lastTime)
          }
      },
      getters:{
          getToken(state){
            if(!state.token){
                state.token=localStorage.getItem("token")
            }
            return state.token;
          },
        getName(state){
          if(!state.name){
            state.name=localStorage.getItem("name")
          }
          return state.name;
        },
        getLastTime(state){
          if(!state.lastTime){
            state.lastTime=localStorage.getItem("lastTime")
          }
          return state.lastTime;
        },
      }
})
export default store
