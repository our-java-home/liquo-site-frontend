<!-- 
 * @Author: kongjingchao 
 * @Date: 2023-06-17 10:38:19 
 * @Last Modified by: kongjingchao
 * @Last Modified time: 2023-06-17 10:38:39
 * @Description: 登录页面
-->
<template>
  <div class="login-container">
    <el-form :model="formData" status-icon :rules="rules" ref="formData">
      <h3>系统登录</h3>
      <el-form-item prop="user_name">
        <el-input type="text" autocomplete="off" clearable prefix-icon="el-icon-user" v-model="formData.user_name">
        </el-input>
      </el-form-item>
      <el-form-item prop="user_password">
        <el-input type="password" autocomplete="off" clearable show-password prefix-icon="el-icon-lock"
          v-model="formData.user_password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" style="width: 100%">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    // 自定义校验
    const validateUser = (rule, value, callback) => {
      if (!value) callback(new Error('请输入账号'));
      callback();
    };
    return {
      formData: {
        user_name: '',
        user_password: '',
      },
      rules: {
        user_name: [{ validator: validateUser, trigger: 'blur' }],
        user_password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    // TODO
    login() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          sessionStorage.setItem('role', 'admin');
          this.$router.push({ name: 'home' });
        } else {
          return false;
        }
      });
    },
  },
  mounted() { },
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-color: $theme-bg-color;
  @include flex(center, center);

  .el-form {
    width: 400px;
    padding: 20px;
    color: #fff;

    h3 {
      text-align: center;
      margin-bottom: 20px;
    }

    .hint {
      opacity: 0.5;
    }
  }
}
</style>
