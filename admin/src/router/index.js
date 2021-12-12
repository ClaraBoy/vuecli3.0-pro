import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router=new Router({
  routes: [
    {
      path: '/BasicData',
      name: 'BasicData',
      component: () => import("../components/BasicData/BasicData")
    },
    {
      path:'/',
      name:"login",
      component:()=>import("../view/Login")
    },
    {
      path: "/CommentData",
      name: "CommentData",
      component: () => import("../components/CommentData/CommentData")
    },
    {
      path: "/CommentAudit",
      name: "CommentAudit",
      component: () => import("../components/CommentAudit/CommentAudit")
    },
    {
      path: "/IndexConfig",
      name: "IndexConfig",
      component: () => import("../components/IndexConfig/IndexConfig")
    },
    {
      path: "/Release_Article",
      name: "Release_Article",
      component: () => import("../components/Release_Article/Release_Article")
    },
    {
      path: "/Release_UpData",
      name: "Release_UpData",
      component: () => import("../components/Release_UpData/Release_UpData")
    },
    {
      path: "/Release_Delete",
      name: "Release_Delete",
      component: () => import("../components/Release_Delete/Release_Delete")
    },
    {
      path: "/UsersManagement",
      name: "UsersManagement",
      component: () => import("../components/UsersManagement/UsersManagement")
    },
    {
      path: "/UserArticle",
      name: "UserArticle",
      component: () => import("../components/UserArticle/UserArticle")
    }
    ,
    {
      path:"/sing_to",
      name:"sing_to",
      component:()=>import("../view/sing_to")
    },
  ],
  mode:"history",
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.path!=="/" && !router.app.$options.store.getters.getToken) next({ name: 'login' })
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})
export default router
