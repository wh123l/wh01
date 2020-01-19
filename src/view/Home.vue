<template>
  <!--  页面整体布局-->
  <el-container class="home-container">
    <!--    头部区域-->
    <el-header>
      <div>
        <div>
          <img src="../assets/logo.png" >
        </div>
        <span>影视作品分析</span>
      </div>
      <el-button @click="logout" round type="info" >退出</el-button>
    </el-header>
    <!--    页面主体区域-->
    <el-container>
      <!--      侧边栏-->
      <el-aside width="200px">
        <!--        侧边栏菜单区域-->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
        >
          <!--          一级菜单-->
          <el-submenu index="film">
            <!--            一级菜单模板区域-->
            <template slot="title">
              <!--              图标-->
              <i class="el-icon-location"></i>
              <!--              文本-->
              <span>电影</span>
            </template>
            <!--            二级菜单-->
            <el-menu-item index="introduction">
              <template slot="title">
                <!--              图标-->
                <i class="el-icon-location"></i>
                <!--              文本-->
                <span>简介</span>
              </template>
            </el-menu-item>

            <el-menu-item index="evaluate">
              <template slot="title">
                <!--              图标-->
                <i class="el-icon-location"></i>
                <!--              文本-->
                <span>评论</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-menu-item index="filmtop">
            <template slot="title">
              <!--              图标-->
              <i class="el-icon-location"></i>
              <!--              文本-->
              <span>电影排行榜</span>
            </template>
          </el-menu-item>

          <!--          一级菜单-->
          <el-submenu index="2">
            <!--            一级菜单模板区域-->
            <template slot="title">
              <!--              图标-->
              <i class="el-icon-location"></i>
              <!--              文本-->
              <span>用户管理</span>
            </template>
            <!--            二级菜单-->
            <el-menu-item index="users">
              <template slot="title">
                <!--              图标-->
                <i class="el-icon-location"></i>
                <!--              文本-->
                <span>用户列表</span>
              </template>
            </el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>
      <!--      右侧主体-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {}
    },
    methods: {
      //退出功能
      logout() {
        //清空sessionStorage中缓存的token
        window.sessionStorage.clear();
        //路由导航到登录页面
        this.$router.push("/login")

      },

    }
  }
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    align-items: center;
    color: #ffffff;
    font-size: 20px;
    background-color: #373d41;
    >div{
      display: flex;
      align-items: center;
      div {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        border: 1px solid black;
        img {
          width: 100%;
          height: 100%;
          border-radius: 30px;
        }
      }
      span {
        margin-left: 15px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
</style>
