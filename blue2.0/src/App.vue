<template>
  <div id="app">
      <div class="top"><Show></Show></div>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import Show from "./components/show";
export default {
  name: 'App',
  components:{
    Show,
  },
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isCollapse: true,
      isRouterAlive: true,
    };
  },
  methods: {
    reload () {
      this.isRouterAlive = false;            //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true;         //再打开
      })
    }
  },
  mounted() {
      document.body.style.maxWidth=window.screen.width+"px";
      this.widths = document.documentElement.clientWidth;
  }
}
</script>

<style lang="less">
@import "./assets/css/body.less";
*{padding: 0;margin: 0;border: 0;}
.top{
  /*position: sticky;*/
  /*top: 0;*/
  /*-webkit-box-shadow: 0 0 15px 5px rgba(1,1,1,0.1);*/
  /*-moz-box-shadow: 0 0 15px 5px rgba(1,1,1,0.1);*/
  /*box-shadow: 0 0 15px 5px rgba(1,1,1,0.1);*/
}
.el-main{
  padding: 0;
  overflow: hidden;
}
.el-header{
  padding: 0;
}
body{
  margin:0 auto 0 auto;
}
</style>
