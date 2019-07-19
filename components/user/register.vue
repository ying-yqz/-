<template>
  <div class="register">
    <el-form :model="regform" :rules="rules" ref="regform" class="form">
      <el-form-item prop="username">
        <el-input v-model="regform.username" placeholder="用户名/手机"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input placeholder="验证码" v-model="regform.captcha">
          <template slot="append">
            <el-button @click="handleSendCaptcha">发送验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="regform.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="regform.password" placeholder="密码"></el-input>
      </el-form-item>

      <el-form-item prop="checkPass">
        <el-input
          type="password"
          v-model="regform.checkPass"
          auto-complete="off"
          placeholder="确认密码"
        ></el-input>
      </el-form-item>

      <el-button type="primary" class="submit" @click="handleLoginSubmit">注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.regform.checkPass !== "") {
          this.$refs.regform.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regform.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      regform: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkPass: ""
      }
    };
  },

  methods: {
    //发送验证码
    handleSendCaptcha() {
      if (!this.regform.username) {
        this.$confirm("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }

      if (this.regform.username.length !== 11) {
        this.$confirm("手机号码格式错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }

      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.regform.username
        }
      }).then(res => {
        // console.log(res.data);
        const { code } = res.data;
        this.$confirm(`模拟手机验证码为：${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },

    //注册按钮
    handleLoginSubmit() {
      this.$refs.regform.validate(valid => {
        if (valid) {
          const { checkPass, ...props } = this.regform;

          //注册接口（自行放到action）
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: props
          }).then(res=>{
              //把数据保存到vuex，user是模块名字（命名空间）
              this.$store.commit("user/setUserInfo",res.data);
              this.$router.back()
          })
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.form {
  padding: 25px;
}
.submit {
  width: 100%;
}
</style>
