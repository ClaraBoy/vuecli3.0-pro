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
        <el-button
          @click.native.prevent="selectRow1(scope.$index, scope.row.menutitle,scope.row.applicationid)"
          type="text"
          size="small">
          查看评论
        </el-button>
        <el-button
          @click.native.prevent="selectRow2(scope.$index, scope.row.menutitle,scope.row.applicationid)"
          type="text"
          size="small">
          查看回复
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
  <el-dialog title="评论信息" :visible.sync="dialogTableVisible1">
    <el-table :data="topiccomments.list">
      <el-table-column property="topicdate" label="日期" width="180"></el-table-column>
      <el-table-column property="topicname" label="发布人" width="100"></el-table-column>
      <el-table-column property="topictext" label="评论内容"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            style="color: red"
            @click.native.prevent="deleteRow1(scope.row.id,scope.row.topictitle,scope.row.topicred,scope.row.applicationid)"
            type="text"
            size="small">
            违规删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <el-dialog title="回复信息" :visible.sync="dialogTableVisible2">
    <el-table :data="replecomments.list">
      <el-table-column property="repledate" label="日期" width="180"></el-table-column>
      <el-table-column property="commentname" label="回复人" width="100"></el-table-column>
      <el-table-column property="replename" label="被回复人"></el-table-column>
      <el-table-column property="repletext" label="回复内容"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            style="color: red"
            @click.native.prevent="deleteRow2(scope.row.id,scope.row.repletitle,scope.row.applicationid)"
            type="text"
            size="small">
            违规删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</div>
</template>

<script>
import {comments, deletecomments, deletesmenu, oneEU, queryListsmenu} from "../../network/request";

export default {
name: "CommentData",
  inject:['reload'],
  data(){
  return{
    menuList: {list:[{}]},
    topiccomments:{list:[{}]},
    replecomments:{list:[{}]},
    search:"",
    dialogTableVisible1:false,
    dialogTableVisible2:false,
  }
  },
  methods:{
    selectRow1(index,titleName,applicationid){
      comments({
          url:"/topiccomments/"+titleName+"/"+applicationid,
         method:"GET",
      }).then(res=>{
            if(res.data.length===0){
              this.$message({
                type: 'success',
                message: '无评论!'
              });
            }else{
              this.dialogTableVisible1=true;
              this.topiccomments.list=res.data;
            }
      })
    },
    selectRow2(index,titleName,applicationid){
      comments({
        url:"/replecomments/"+titleName+"/"+applicationid,
        method:"GET",
      }).then(res=>{
        if(res.data.length===0){
          this.$message({
            type: 'success',
            message: '无回复!'
          });
        }else{
          this.dialogTableVisible2=true;
          this.replecomments.list=res.data;
        }
      })
    },
    deleteRow1(id,titleName,topicred,applicationid){
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletecomments({
          url: "/deletetopiccomments/"+id+"/"+titleName+"/"+topicred+"/"+applicationid,
          method:"Get",
        }).then(res => {
          if(res.data){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.updateMenuCommentsNum(titleName,applicationid);
            this.dialogTableVisible1=false;
            this.selectRow1(0,titleName);
          }else{
            this.$message({
              type: 'warning',
              message: '删除失败!'
            });
          }
        }).catch(err => {

        });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteRow2(id,titleName,applicationid){
      this.$confirm('此操作将永久删除该回复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletecomments({
          url: "/deletereplecomments/"+id,
          method:"Get",
        }).then(res => {
          if(res.data){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.updateMenuCommentsNum(titleName,applicationid);
            this.dialogTableVisible1=true;
            this.selectRow2(0,titleName);
          }else{
            this.$message({
              type: 'warning',
              message: '删除失败!'
            });
          }
        }).catch(err => {

        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  sendMenu(){
    queryListsmenu({
      url: "/queryMenuList"
    }).then(res => {
      this.menuList.list=res.data;
    }).catch(err => {
      console.log(err)
    })
  },
    updateMenuCommentsNum(menuTitle,applicationid){
      oneEU({
        url:"/updateMenuCommentsNum/"+menuTitle+"/"+applicationid,
        methods: "Post",
      }).then(res=>{
        if(res){
          this.reload();
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
