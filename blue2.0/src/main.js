import Vue from 'vue'
import axios from "axios";
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./srore/index";
import audio from "vue-mobile-audio";
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
Vue.use(ElementUI);
Vue.use(audio)
Vue.prototype.axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
