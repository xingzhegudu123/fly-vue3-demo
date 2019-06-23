<template>
  <div class="admin_View">
    <el-container>
      <el-header>喵喵网管理后台, 欢迎{{$store.state.user.name}}</el-header>
      <el-container>

        <el-aside width="200px">
          <el-menu default-active="1">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <router-link   tag="span"  to="/Admin/user"    slot="title">用户管理</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <router-link      tag="span"  to="/Admin/movie"     slot="title">电影管理</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <router-link     tag="span"    to="/Admin/cinema"     slot="title">影院管理</router-link>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "admin",

  beforeRouteEnter(to, from, next) {
    axios.get("/api2/admin").then(res => {
      var status = res.data.status;

      if (status === 0) {
        // 1 没有登录进不了管理员页面  2 登录了是普通用户也进不了
        next();
      } else {
        next("/mine/login");
      }
    });
  }
};
</script>

<style scoped>
.admin_View {
  width: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
 
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
