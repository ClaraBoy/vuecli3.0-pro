<template>
<div><el-table
  :data="MenuInfo.list.filter(data => !search || data.menutitle.toLowerCase().includes(search.toLowerCase()))"
  @selection-change="handleSelectionChange"
  style="width: 100%"
  max-height="700"
  ref="multipleTable">
  <el-table-column
    type="selection"
    fixed
    prop="menuid"
    label="文章ID"
    width="80">
  </el-table-column>
  <el-table-column
    prop="menutitle"
    label="文章标题"
    width="140">
  </el-table-column>
  <el-table-column
    prop="info1"
    label="相关1"
    width="120">
  </el-table-column>
  <el-table-column
    prop="info1Url"
    label="相关1url"
    width="90">
  </el-table-column>
  <el-table-column
    prop="info2"
    label="相关2"
    width="120">
  </el-table-column>
  <el-table-column
    prop="info2Url"
    label="相关2url"
    width="90">
  </el-table-column>
<!--  <el-table-column-->
<!--    prop="titleid"-->
<!--    label="titleid"-->
<!--    width="120">-->
<!--  </el-table-column>-->
  <el-table-column
    prop="menured"
    label="阅量"
    sortable
    width="90">
  </el-table-column>
  <el-table-column
    prop="menudate"
    label="发布时间"
    sortable
    width="120">
  </el-table-column>
  <el-table-column
    prop="applicationid"
    label="发布人"
    sortable
    width="100">
  </el-table-column>
  <el-table-column
    prop="review"
    label="审核"
    sortable
    width="120">
  </el-table-column>
  <el-table-column
    fixed="right"
    label="操作"
    width="120">
    <template slot-scope="scope">
      <el-button
                 @click.native.prevent="queryMenuOnle(scope.row.menuid)"
                 type="text"
                 size="small">
        预览
      </el-button>
    </template>
  </el-table-column>
  <el-table-column align="right">
    <template slot="header" slot-scope="scope">
      <el-input
        v-model="search"
        size="small"
        placeholder="输入关键字搜索"/>
    </template>
  </el-table-column>
</el-table>
  <el-dialog
    title="文章预览"
    :visible.sync="dialogVisible"
    fullscreen modal :close-on-click-modal="false">
    <div class="grid-content bg-purple-light">
      <h2 style="text-align: center">标题:{{MenuInfoOnle.menutitle}}</h2>
      <div style="text-align: right;position: absolute;top: 15%;right: 5%">
        <el-button type="primary" @click="openUrl(MenuInfoOnle.info1Url)">{{ MenuInfoOnle.info1 }}</el-button>
        <el-button type="primary" @click="openUrl(MenuInfoOnle.info2Url)">{{ MenuInfoOnle.info2 }}</el-button>
        <el-button type="primary" @click="pass(MenuInfoOnle.menuid,MenuInfoOnle.applicationid,MenuInfoOnle.menutitle)">通过</el-button>
        <el-button type="danger" @click="nopass(MenuInfoOnle.menuid,MenuInfoOnle.applicationid,MenuInfoOnle.menutitle)">不通过</el-button>
      </div>
      <br>
      <div class="righttitle">
        <el-scrollbar style="height:100%;">
          <div v-html="MenuInfoOnle.detailstext"></div>
        </el-scrollbar>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {deletesmenu, oneEU} from "../../network/request";

export default {
  name: "UserArticle",
  inject:['reload'],
  data(){
    return{
          MenuInfo:{list:[{}]},
          search: '',
           dialogVisible:false,
            MenuInfoOnle:{}
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.deleteList=[];
      this.multipleSelection=val;
      for(let i=0;i<this.multipleSelection.length;i++){
        this.deleteList.push(this.multipleSelection[i].menuid)
      }
    },
    queryMenuOnle(menuid){
      oneEU({
        url:"/queryMenuOnle/"+menuid,
        method:"GET",
      }).then(res=>{
        this.MenuInfoOnle=res.data;
       this.dialogVisible=true;
      })
    },
    pass(id,applicationid,menutitle){
      this.$confirm('是否确认通过, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        oneEU({
          url: "/passMenu/" + id,
          method:"POST",
        }).then(res => {
          this.reload();
          this.$message({
            type: 'success',
            message: '通过成功!'
          });
          this.msg(applicationid,menutitle+" 文章审核通过");
        }).catch(err => {

        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消通过'
        });
      });
    },
    nopass(id,applicationid,menutitle){
      this.msg(applicationid,menutitle+" 文章未审核通过");
    },
    msg(applicationid,msg){
      oneEU({
        url:"/sendDirectMessage/"+applicationid+"/"+msg,
      })
    },
    openUrl(url){
      window.open(url,"_bank")
    }
  },
  mounted() {
    oneEU({
      url:"/queryMenuNo/no",
      method:"GET",
    }).then(res=>{
      if(res){
        this.MenuInfo.list=res.data;
      }
    })
  }
}
</script>

<style scoped>
/deep/ .el-scrollbar__wrap {
  /*根据需求设置overflow*/
  overflow-x: hidden;
}
.right{
  height: 560px;
  display: flex;
  justify-content: center;
  flex: 5;
  width: 60%;
  text-align:center;
  margin-top: 8%;
}
.righttitle{
  height: 540px;
  margin: 0 auto;
  width: 60%;
}
</style>
