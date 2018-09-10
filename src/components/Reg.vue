<template>
<div class="content">
  <div>
<router-link to='/main'>
<img :src="IP1" alt="" class="image1">
</router-link>  
    <span class="login-logo-tip">
      依《网络安全法》相关要求，即日起蘑菇街会员登陆需绑定手机。
      为保障您的账户安全及正常使用，如您尚未绑定，请尽快完成绑定，感谢您的理解和支持!
    </span>
  </div>
  <div class="backgroundImg">
    <img :src="IP" alt="">
  </div>
   <el-alert  title="" type="warning" @close="hello" class="alertCase"> </el-alert>
  <div id="login">  
        <p>欢迎进入蘑菇街后台注册</p>       
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="name">
          <el-input type="text" v-model="ruleForm.name"></el-input>
          </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input type="text" v-model="ruleForm.nickname"></el-input>
        </el-form-item>
         <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
       <div class="demo-ruleForm1">
          <el-button type="primary" @click="submitForm('ruleForm')" class="btn">注册</el-button>
          <router-link to='/log' class="clickReg">已有账号？点击登录</router-link>
       </div> 
      </el-form>
    </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(" "));
      } else if (value !== this.ruleForm.name) {
        callback(new Error(" "));
      } else {
        callback();
      }
    };
    var validateNickname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(" "));
      } else if (value !== this.ruleForm.nickname) {
        callback(new Error(" "));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(" "));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(" "));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error(" "));
      } else {
        callback();
      }
    };
    return {
      ip: "http://127.0.0.1:3333",
      ruleForm: {
        name: "",
        nickname: "",
        pwd: "",
        checkPass: ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        nickname: [{ validator: validateNickname, trigger: "blur" }],
        pwd: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      IP: "http://127.0.0.1:3333/images/201808291043431.png",
      IP1: "http://127.0.0.1:3333/images/20180829104343.png"
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btn();
        } else {
          this.hello();
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    hello() {
      this.$message.error("请填写所有内容!!");
    },
    btn() {
      let param = {
        name: this.ruleForm.name,
        nickname: this.ruleForm.nickname,
        pwd: this.ruleForm.pwd,
        checkPass: this.ruleForm.checkPass,
        islogin: "sp",
        head_portrait: "",
        merchant: []
      };
      axios.post(this.ip + "/reg", param).then(msg => {
        this.$router.push("/log");
      });
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
/* 弹框 */
.alertCase {
  background-color: transparent;
}
/* 背景图 */
.backgroundImg img {
  width: 100%;
  position: relative;
}
/* 小图 */
.content .image1 {
  width: 220px;
  height: 52px;
  margin: 30px 50px 30px 150px;
}
/* 最上面文字 */
.login-logo-tip {
  position: absolute;
  top: 40px;
  display: inline-block;
  height: 28px;
  width: 861px;
  margin-left: 20px;
  background-color: #ffefef;
  border: 1px solid #ffc0cc;
  text-align: center;
  line-height: 28px;
  font-size: 12px;
  color: #666;
}
/* 登录页面 */
#login {
  position: absolute;
  background: #ffeceb;
  top: 24%;
  left: 60%;
  border: 1px solid #e5e5e5;
  height: 345px;
  width: 455px;
  opacity: 0.9;
}
p {
  margin: 25px 0;
  text-align: center;
  color: #ff5777;
  font-size: 18px;
}
.el-input {
  width: 290px;
  height: 50px;
}
.demo-ruleForm1 {
  margin-left: 125px;
}
/* 登录按钮 */
.el-button--primary {
  width: 100px;
  height: 40px;
  background-color: #ff5777;
  border: 1px solid #ff5777;
}
.el-button--primary:focus,
.el-button--primary:hover {
  background-color: #ff5777;
  border: 1px solid #ff5777;
}
.clickReg {
  color: #ff5777;
}
.clickReg:hover {
  color: #409eff;
}
</style>
