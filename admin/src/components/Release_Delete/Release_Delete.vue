<template>
<div>
<div class="Clara">
  <el-table
    :data="menuList.list.filter(data => !search || data.menutitle.toLowerCase().includes(search.toLowerCase()))"
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
      width="150">
    </el-table-column>
    <el-table-column
      prop="info2"
      label="相关2"
      width="150">
    </el-table-column>
    <el-table-column
      prop="menuid"
      label="menuid"
      width="120">
    </el-table-column>
    <el-table-column
      prop="menured"
      label="阅读量"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="rightto"
      label="是否热门"
      width="120">
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
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, scope.row.menuid)"
          type="text"
          size="small">
          移除
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
</div>
  <br>
  <div style="float: right;right: 60px">
  <el-button @click="toggleSelection()">取消选择</el-button>
  <el-button @click="deletes()">批量删除</el-button>
  </div>
</div>
</template>
<script>
import {deletesmenu, queryListsmenu} from "../../network/request";
export default {
  name: "Release_Delete",
  inject:['reload'],
  methods: {
    deleteRow(index, rows) {
      this.deleteList=[];
     // console.log(index+"/"+rows)
     // rows.splice(index, 1);
      this.deleteList.push(rows)
      this.deletes();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
          console.log(rows)
        });
      } else {
        this.$refs.multipleTable.clearSelection();
       // console.log(rows)
      }
    },
    deletes(){
      if(this.deleteList.length<=0)
      {
        this.$message('未选择任何数据');
      }else {
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletesmenu({
            url: "/deleteMenu?delete=" + this.deleteList
          }).then(res => {
            this.reload();
          }).catch(err => {

          })
          this.reload();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    handleSelectionChange(val) {
      this.deleteList=[];
      this.multipleSelection=val;
      for(let i=0;i<this.multipleSelection.length;i++){
        this.deleteList.push(this.multipleSelection[i].menuid)
      }
    }
  },
  data(){
    return{
      menuList: {list:[{}]},
      multipleSelection: [],
      deleteList:[],
      search: ''
    }
  },
  mounted() {
    queryListsmenu({
      url: "/queryMenuList"
    }).then(res => {
      this.menuList.list=res.data;
    }).catch(err => {
      console.log(err)
    })
  },
}
</script>

<style scoped>
.Clara{
  height: auto;
}
</style>
