<template>
  <div>
<!--    面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片视图区域-->
    <el-card>
<!--      搜索框-->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
<!--      用户列表区域-->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
<!--            {{scope.row}}-->
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="181px">
          <template slot-scope="scope">
<!--            编辑-->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editTable"></el-button>
<!--            删除-->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
<!--            分配角色-->
            <el-tooltip  effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
<!--      分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>

  export default {
        name: "User",
      data() {
          return {
            queryInfo: {
              query:'',
              //当前页数
              pagenum:1,
              //当前每页显示多少条数据
              pagesize:2
            },
            userlist: [],
            allTableData: [],
            total: 0
          }
      },
      created() {
        this.getData()
      },
      methods: {
        getData() {
          this.$axios({
            method: 'get',
            url: '/root/user/userslist',
            data:{
              // queryInfo: this.queryInfo
              params: this.queryInfo
            }
          }).then(res => {
            // console.log(res)
            if (res.status !== 200) {
              this.$message.error('获取用户列表失败')
            } else {
              console.log(res)
              this.allTableData = res.data
              this.total = res.data.length
              this.setPaginations()
            }
          }).catch(err => {
            console.log(err)
          })
        },
        setPaginations() {
          //显示数据
          this.userlist = this.allTableData.filter((item, index) => {
            return index < this.queryInfo.pagesize;
          })
        },

        // 监视pagesize改变事件
        handleSizeChange(newSize) {
          // console.log(newSize)
          this.queryInfo.pagesize = newSize
          this.getData()
        },

        // 监视页码值改变事件
        handleCurrentChange(newPage) {
          console.log(newPage)
          this.queryInfo.pagenum = newPage
          // this.getData()
          //获取当前页
          let index = this.queryInfo.pagesize * (newPage -1);
          //获取总数
          let allData = this.queryInfo.pagesize * newPage;

          let tablist=[];
          for(let i = index;i<allData;i++) {
            if (this.allTableData[i]) {
              tablist.push(this.allTableData[i])
            }
            this.userlist = tablist
          }
        },
        userStateChanged(userinfo) {
          // console.log(userinfo)
          this.$axios({
            method: 'put',
            url: '/root/user/userslist',
            data: {
              params: userinfo
            }
          }).then(res => {
            console.log(res)
            if (res.status !== 200) {
              userinfo.mg_state = !userinfo.mg_state;
              this.$message.error('更新用户列表失败')
            } else {

              this.$message.success('更新用户列表成功')
            }
          }).catch(err => {
            console.log(err)
          })
        },
        editTable() {

        }

      }




          // const {data:res} = await this.$http.get('users',{
          //    params: this.queryInfo
          // })
          // if (res.meta.status !== 200 ) {
          //   return  this.$message.error('获取用户列表失败')
          // }
          // this.userlist = res.data.users
          // this.total = res.data.total
          // console.log(res)



    }
</script>

<style scoped>

</style>
