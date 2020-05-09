<template>
  <div>
    <h2>新建管理员</h2>
    <el-form
      :model="model"
      :rules="rules"
      label-width="120px"
      status-icon
      ref="ruleForm"
      @submit.native.prevent="save('ruleForm')"
      style="width:50rem;margin:0 auto"
    >
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholer="请输入密码"
          type="password"
          v-model="model.password"
          clearable
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          placeholer="请再次输入密码"
          type="password"
          v-model="model.confirmPassword"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const validateName = (rule, value, callback) => {
      const nPatrn = /^(\D)[A-z0-9\u4e00-\u9af5_-]{1,16}$/;
      if (!value) {
        callback(new Error("名称不可为空"));
      } else if (!nPatrn.test(value)) {
        callback(new Error("请输入2到16位的非数字开头，不包含特殊符号的名称"));
      }
      callback();
    };
    const validatePass = (rule, value, callback) => {
      const pPatrn = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
      if (!value) {
        callback(new Error("密码不可为空"));
      } else if (!pPatrn.test(value)) {
        callback(
          new Error(
            "密码需包含至少八个字符，至少一个字母，一个数字和一个特殊字符"
          )
        );
      }
      callback();
    };
    const validateConfirmPass = (rule, value, callback) => {
      const pPatrn = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
      if (value !== this.model.password) {
        callback(new Error("请输入相同的密码"));
      } else if (!pPatrn.test(value)) {
        callback(
          new Error(
            "密码需包含至少八个字符，至少一个字母，一个数字和一个特殊字符"
          )
        );
      }
      callback();
    };
    return {
      model: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, validator: validateName, trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, validator: validateConfirmPass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          delete this.model.confirmPassword;
          await this.$http.post("/rest/admin_users", this.model);
          this.$router.push("/admin_users/list");
          this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>