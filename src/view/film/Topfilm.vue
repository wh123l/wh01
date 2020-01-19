<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>排行榜</el-breadcrumb-item>
    </el-breadcrumb>
    <h4>电影TOP榜单</h4>
<!--轮播图-->
    <template>
      <el-carousel :interval="3000" type="card" height="200px">
        <el-carousel-item v-for="item in imagesbox" :key="item.id">
          <img :src="item.src" style="width: 100%;height: 100%;" >
        </el-carousel-item>
      </el-carousel>
    </template>

    <el-card>
      <!--      电影列表区域-->
      <el-table border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="导演" prop="email"></el-table-column>
        <el-table-column label="主演" prop="mobile"></el-table-column>
        <el-table-column label="类型" prop="role_name"></el-table-column>
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
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "Topfilm",
      data () {
          return {
            imagesbox:[],
          }
      },
      mounted() {
         this.picData()
      },
      methods: {
          picData() {
          this.$axios({
            method: 'get',
            url: '/root/login/picsdata',
            data: {
              params: this.imagesbox
            }
          }).then(res => {
            console.log(res)
            if (res.status !== 200) {
              this.$message.error('获取用户列表失败')
            } else {
              console.log(res)
              this.imagesbox = res.data

            }
          }).catch(res => {
            console.log(res)
          })
        },

      }
    }
</script>

<style scoped lang="less">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
