<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card" @submit.native.prevent="login">
      <el-form :model="model" label-width="5rem">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="model.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            placeholder="请输入用户密码"
            v-model="model.password"
            clearable
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label-width="11.5rem">
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      localStorage.token = res.data.token;
      this.$router.push('/')
      this.$message({
        message: '登录成功',
        type: 'success'
      })
    }
  }
};
</script>

<style>
.login-card {
  width: 30rem;
  margin: 10rem auto;
}
</style>