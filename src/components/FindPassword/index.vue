<template>
  <div class="findPassword_body">
    <div class="password_email">
      邮箱:
      <input type="text" v-model="email" class="password_text">
      <button @touchstart="handleToVerify">{{verifyInfo}}</button>
    </div>
    <div>
      新密码:
      <input type="text" v-model="password" class="password_text">
    </div>
    <div>
      验证码:
      <input type="text" v-model="verify" class="password_text">
      <!-- <button @touchstart="handleToVerify">发送验证码</button> -->
    </div>

    <div class="password_btn">
        <button @touchstart="handleToPassword">修改</button>
    </div>

    <div class="password_link">
      <router-link to="/mine/login">立即登录</router-link>
      <router-link to="/mine/register">立即注册</router-link>
    </div>
  </div>
</template>

<script>
import { messageBox } from '@/components/JS'
export default {
  name: "findPassword",
  data(){
      return{
          email : '',
          password : '',
          verify : '',
          verifyInfo: '发送验证码'
      }
  },
  methods: {
       handleToVerify(){
           this.axios.get('/api2/users/verify?email='+ this.email).then((res)=>{
                 var status =res.data.status;
                  var That = this;
                 if(status===0){
                     messageBox({
                         title:'验证码',
                         content:'验证码已发送',
                         ok:'确定',
                         handleOk(){
                             That.countDown();
                         }
                     })
                 }else{
                     messageBox({
                         title:'验证码',
                         content:'验证码发送失败',
                         ok:'确定',
                     })
                 }
           })
       },
        handleToPassword(){
             this.axios.post('/api2/users/findPassword',{
                email : this.email,
                password :  this.password,
                verify : this.verify
           }).then((res)=>{
               var status = res.data.status;
               var that = this;
                if(status===0){
                     messageBox({
                         title:'修改密码',
                         content:'修改成功',
                         ok:'确定',
                         handleOk(){
                             that.$router.push('/mine/login')
                         }
                     })
                 }else{
                     messageBox({
                         title:'修改密码',
                         content: res.data.msg ,
                         ok:'确定',
                     })
                 }
           })
        },
         countDown(){
           this.disabled = true;
           var count = 60;
           var timer = setInterval(()=>{
               count--;
               this.verifyInfo = '剩余'+count+'秒';
               if(count===0){
                        this.disabled = false; 
                        count = 60;
                        this.verifyInfo = '发送验证码';
                        clearInterval(timer);
               }
           },1000);
          

       }
  }
}
</script>

<style scoped>
.findPassword_body {
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
}
.findPassword_body .password_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.findPassword_body .password_btn {
  height: 50px;
  margin: 10px;
}
.findPassword_body .password_btn button {
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}

.findPassword_body .password_email {
  position: relative;
}

.findPassword_body .password_email button {
  position: absolute;
  height: 30px;
  top: 20px;
  right: 10px;
  border: none;
  border-radius: 4px;
  padding: 5px;
}

.findPassword_body .password_link {
  display: flex;
  justify-content: space-between;
}
.findPassword_body .password_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #e54847;
}
</style>
