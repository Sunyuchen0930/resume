<template>
  <div class="container">
    <login-component ref="loginRef" />
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="form">
      <div style="font-size: 35px;font-weight: bold;margin-bottom: 15px;">欢迎注册
      </div>
      <div style="font-size: 14px;color:gray;margin: 20px 0 15px 0">
        已有账号？<span style="color:#0093fa;cursor: pointer" @click="login()">登录</span>
      </div>
      <el-form-item class="form-item" label="用户名" prop="username">
        <el-input v-model="ruleForm.username" class="form-input" placeholder="请设置用户名" />
      </el-form-item>
      <el-popover
        ref="popover"
        placement="top-end"
        trigger="focus"
        width="300"
      >
        长度为8~14个字符<br>字母/数字以及标点行号全少包含2种
      </el-popover>
      <el-form-item class="form-item" label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          v-popover:popover
          class="form-input"
          placeholder="请设置登录密码"
          type="password"
        />
      </el-form-item>

      <el-popover
        ref="popover"
        placement="top-end"
        trigger="focus"
        width="300"
      >
        长度为8~14个字符<br>字母/数字以及标点行号全少包含2种
      </el-popover>
      <el-form-item class="form-item" label="重复密码" prop="password">
        <el-input
          v-model="ruleForm.re_password"
          v-popover:popover
          class="form-input"
          placeholder="请再一次输入密码"
          type="password"
        />
      </el-form-item>

      <div style="margin-top: 40px">
        <el-button
          style="width: 100%;height: 50px;border-radius: 20px;font-size: 16px;font-weight: bold"
          type="primary"
          @click="submitForm('ruleForm')"
        >
          注册
        </el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import LoginComponent from '@/views/users/components/LoginComponent'
import { register } from '@/api/user'

export default {
  components: {
    LoginComponent
  },
  data() {
    const notEmptyValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(`${rule.fullField}不能为空`))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        re_password: ''
      },
      rules: {
        username: [
          { validator: notEmptyValidator, trigger: 'blur', fullField: '用户名' }
        ],
        password: [
          { validator: notEmptyValidator, trigger: 'blur', fullField: '密码' },
          { min: 8, max: 14, message: '长度在 8 到 14 个字符', trigger: 'blur' }
        ],
        re_password: [
          { validator: notEmptyValidator, trigger: 'blur', fullField: '重复密码' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          register(this.ruleForm).then(res => {
            if (res.data.code === 1000) {
              window.open('/login', '_blank')
              this.$message({
                message: '注册成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    login() {
      this.$refs.loginRef.show()
    }
  }
}
</script>
<style scoped>
.container {
  height: 100vh;
  background: url('https://pic.rmb.bdstatic.com/bjh/news/0c9cb3149ad5f8ee1858a4b7566839ca.jpeg') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.form {
  width: 400px;
  background-color: rgba(255, 255, 255, .9);
  padding: 50px 25px;
  border-radius: 10px;
}

.form-item {
  margin: 30px 0;
}

.form-item >>> .el-input__inner {
  height: 40px;

}

</style>
