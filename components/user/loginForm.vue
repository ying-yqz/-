<template>
  <div class="loginForm">
    <el-form :model="form" :rules="rules" ref="form" class="form">
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <p class="form-text">
        <nuxt-link to="#">忘记密码</nuxt-link>
      </p>

      <el-button type="primary" class="submit" @click="handleLoginSubmit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleLoginSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
        //   this.$axios({
        //     url: "/accounts/login",
        //     method: "POST",
        //     data: this.form
        //   }).then(res=>{
        //       console.log(res)
        //   })

            this.$store.dispatch("user/login", this.form).then(res=>{
                //登陆成功
                this.$message({
                        message: "登录成功，正在跳转",
                        type: "success"
                    });
                //跳转
                this.$router.replace("/")
            })
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
}
.form-item {
  margin-bottom: 20px;
}
.form-text {
  font-size: 12px;
  text-align: right;
  color: #409eff;
  margin-bottom: 5px;
}
.submit {
  width: 100%;
}
</style>
