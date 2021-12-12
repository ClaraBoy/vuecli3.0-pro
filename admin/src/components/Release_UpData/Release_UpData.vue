<template>
  <div>
    <el-table
      :data="menuList.list"
      style="width: 100%"
      :default-sort = "{prop: 'menudate', order: 'descending'}"
    >
      <el-table-column
        prop="menudate"
        label="日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="menutitle"
        label="文章标题"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="menuid"
        label="menuid"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="menucomment"
        label="评论数"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="menured"
        label="阅读数"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="applicationid"
        label="发布人"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="170">
        <template slot-scope="scope">
          <el-button v-show="scope.row.applicationid==='rootClaraTo365'"
            @click.native.prevent="updateRow(scope.$index, scope.row.menutitle,scope.row.applicationid)"
            type="text"
            size="small">
            修改文章
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {queryListsmenu} from "../../network/request";

export default {
  name: "Release_UpData",
  data(){
    return{
      menuList: {list:[{}]},
      search:"",
    }
  },methods:{
    sendMenu(){
      queryListsmenu({
        url: "/queryMenuList"
      }).then(res => {
        this.menuList.list=res.data;
      }).catch(err => {
        console.log(err)
      })
    },
    updateRow(index,titleName,applicationid){
      this.$router.push({
       name:"Release_Article",
        query:{
         titleName:titleName,
          applicationidTo:applicationid,
        }
      })
    }
  },
  mounted() {
    this.sendMenu();
  }
}
</script>

<style scoped>

</style>
