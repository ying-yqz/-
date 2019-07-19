<template>
  <div class="container">
    <el-row type="flex" class="main" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 导航菜单 -->
      <el-row type="flex" class="nav">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录信息 -->
      <div class="login">
        <div v-if="!$store.state.user.userInfo.token">
          <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
        </div>
        <div v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              <!-- 头像 -->
              <img
                :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar"
                alt
              />
              <!-- 昵称 -->
              {{ $store.state.user.userInfo.user.nickname }}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      this.$store.commit("user/clearUserInfo");
      this.$message.success("退出成功");
    }
  }
};
</script>

<style lang="less" scoped>
.container{
  height: 60px;
  box-shadow: 0 3px 0px #f5f5f5;
}
.main {
  width: 1000px;
  margin: 0 auto;
}
.logo {
  height: 60px;

  img {
    height: 42px;
    padding-top: 8px;
  }
}
.nav {
  flex: 1;
  margin: 0 20px;
  a {
    padding: 0 20px;
    line-height: 60px;

    &:hover {
      background: #409eff;
      color: #fff;
    }
  }
  .nuxt-link-exact-active {
    background: #409eff;
    color: #fff;

    &:hover {
      color: #fff;
    }
  }
}
.login {
  line-height: 60px;
  font-size: 14px;
  color: #666;
}
.el-dropdown-link {
  outline: none;
  img {
    width: 36px;
    height: 36px;
    vertical-align: middle;
  }
}
</style>
