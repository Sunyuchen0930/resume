<template>
  <div class="container">
    <div style="display: flex;flex-direction: row;width: 100%;justify-content: center">
      <div style="width: 45%;display: flex;flex-direction: column;align-items:center;">
        <div style="display: flex;flex-direction: column;align-items: flex-start;">
          <strong style="color: white;font-size: 54px;letter-spacing: 3.81px;font-weight: 700;">
            IRAP
          </strong>
          <strong style="color: white;font-size: 49px;letter-spacing: 0;font-weight: 600;">智能简历解析平台</strong>
          <strong style="color: white;font-size: 28px;letter-spacing: 3.81px;font-weight: 700;margin-top: 20px">
            Intelligence Resume Analysis Plat
          </strong>
          <div style="color: white;font-size: 32px;letter-spacing: 3.81px;font-weight: 300;margin-top: 60px">
            求职者的贴心手册
          </div>

        </div>
      </div>
      <div style="width: 40%;display: flex;flex-direction: row;align-items: center;justify-content: center">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="form">
          <div style="font-size: 35px;font-weight: bold;margin-bottom: 15px;">欢迎登录
          </div>
          <div style="font-size: 14px;color:gray;margin: 20px 0 20px 0">
            没有账号？
            <router-link style="color:#0093fa;cursor: pointer" to="/register">注册</router-link>
          </div>
          <el-form-item class="form-item" label="用户名" prop="username">
            <el-input v-model="ruleForm.username" class="form-input" placeholder="请输入用户名" />
          </el-form-item>

          <el-form-item class="form-item" label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              class="form-input"
              placeholder="请输入登录密码"
              type="password"
            />
          </el-form-item>

          <div style="margin-top: 40px">
            <el-button
              style="width: 100%;height: 50px;border-radius: 20px;font-size: 16px;font-weight: bold"
              type="primary"
              @click="submitForm('ruleForm')"
            >
              登录
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/user'
export default {

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
        role: 0
      },
      rules: {
        username: [
          { validator: notEmptyValidator, trigger: 'blur', fullField: '用户名' }
        ],
        password: [
          { validator: notEmptyValidator, trigger: 'blur', fullField: '密码' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm).then(res => {
            this.$router.push('/')
            if (res.data.code === 1000) {
              this.$message({
                message: '登录成功',
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
  padding: 60px 25px;
  border-radius: 10px;
}

.form-item {
  margin: 30px 0;
}

.form-item >>> .el-input__inner {
  height: 40px;

}

</style>
