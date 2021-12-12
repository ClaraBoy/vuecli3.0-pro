import Vue from 'vue'
import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
import Home from "../components/Home"
import Clara_Write from "../view/Bloe"
import Details from"../view/About"
import Login from "../components/Home"
import show from"../components/show"
import p404 from"../components/404"
import Search_page from"../components/Search_page"
import Member from "../view/Member"
export default new VueRouter({
  routes: [
    {
      path:"/",
      redirect:"/Clara"
    },
    {
      path: "/Clara",
     // component: () => import("../components/index")
      component:Home
    },
    {
      path:'/Clara_Write',
     // component: () => import("../view/Bloe"),
      component:Clara_Write
    },
    {
      path:'/Details',
      //component: () => import("../view/About")
      component:Details
    },
    {
      path:'/Login',
     // component:() => import("../components/index")
      component:Login
    },
    {
      path:'/show',
    //  component:() => import("../components/show")
      component:show
    },
    {
      path:"*",
      name:"/404",
     // component:()=>import("../components/404")
      component:p404
    },
    {
      path: "/Search_page",
    //  component: () => import("../components/Search_page")
      component:Search_page
    },
    {
      path: "/Member",
      name:"Member",
      component:Member
    },
  ],
  mode:"history"
})
