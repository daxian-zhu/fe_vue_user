<style>
html,body {
    width: 100%;
    height: 100%;
    background-color: #1c2438;
}
.login {
    width: 100%;
    height: 100%;
    background-color: #1c2438;
    position: relative;
}
.login .from-wrap{
    position: fixed;
    left: 50%;
    margin-left: -200px;
    top: 50%;
    margin-top: -150px;
    width: 400px;
    height: 240px;
    border-radius: 10px;
    background-color: #fff;
    padding: 20px 30px;
}
.login h2 {
    text-align: center;
    margin-bottom: 20px;
}
.login FormItem {
    margin-bottom: 15px;
}
.login .form-footer {
    text-align: right;
}
.ivu-form-item-required .ivu-form-item-label:before {
    display: none;
}
</style>
<template>
    <div class="login">
        <div class="from-wrap">
            <h2>教育云-用户中心</h2>
            <Form ref="loginData" :model="loginData" :rules="ruleValidate" :label-width="80">
                <FormItem label="账号：" prop="acct">
                    <Input type="text" v-model="loginData.username" placeholder="请输入账号"/>
                </FormItem>
                <FormItem label="密码：" prop="pass">
                    <Input type="password" v-model="loginData.password" placeholder="请输入密码" />
                </FormItem>
                <FormItem class="form-footer">
                    <Button type="primary" @click="handleSubmit('loginData')">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import { CLIENT_ID, CLIENT_SECRET } from '@/libs/auth';

import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loginData: {
        username:'',
        password:''
      },
      ruleValidate: {
        username: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { min: 3, max: 16, message: '账号长度3-16个字符', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { type: 'string', min: 6, max: 16, message: '密码长度6-16个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      handleLogin: 'user/handleLogin'
    }),
    handleSubmit (name) {
     this.$refs.loginData.validate((valid) => {
        if (valid) {
          this.isLoading = true;
          let loginForm={
              username: this.loginData.username,
              password: this.loginData.password,
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
          };
          this.handleLogin(loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' });
            this.isLoading = false;
          }).catch(() => {
            this.isLoading = false;
          });
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    }
  }
}
</script>
