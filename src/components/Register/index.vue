<template>
    <div class="register_body">
        <div class="register_email">
            邮箱: <input type="text"  v-model="email"   class="register_text"> <button @touchstart="handleToVerify">发送验证码</button>
        </div>
         <div>
            用户名: <input type="text" v-model="username" class="register_text">
        </div>
         <div>
            密码: <input type="text" v-model="password"    class="register_text"> 
        </div>
         <div>
            确认密码: <input type="text" class="register_text"> 
        </div>
         <div>
            验证码: <input type="text" v-model="verify" class="register_text"> 
        </div>
         <div class="register_btn">
            <button @touchstart='handleToRegister'>注册</button>
        </div>

        <div class="register_link">
        <router-link  to="/mine/login">立即登录</router-link>
        <router-link to="/mine/findPassword">找回密码</router-link>
      </div>
    </div>
</template>

<script>
import { messageBox } from '@/components/JS'
export default {
   name : 'register',
   data (){
       return{
           email:'',
           username:'',
           password:'',
           verify:''
       }
   },
   methods:{
       handleToRegister(){
           console.log(this.verify);
           this.axios.post('/api2/users/register',{
                email : this.email,
                username : this.username,
                password :  this.password,
                verify : this.verify
           }).then((res)=>{
               var status = res.data.status;
               var that = this;
                if(status===0){
                     messageBox({
                         title:'注册',
                         content:'注册成功',
                         ok:'确定',
                         handleOk(){
                             that.$router.push('/mine/login')
                         }
                     })
                 }else{
                     messageBox({
                         title:'注册',
                         content: res.data.msg ,
                         ok:'确定',
                     })
                 }
           })
       },
       handleToVerify(){
           this.axios.get('/api2/users/verify?email='+this.email).then((res)=>{
                 var status =res.data.status;
                 if(status===0){
                     messageBox({
                         title:'验证码',
                         content:'验证码已发送',
                         ok:'确定',
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
   }
}
</script>

<style scoped>
.register_body{
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
}
/* #content .login_body {
  width: 100%;
} */
.register_body .register_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.register_body .register_btn {
  height: 50px;
  margin: 10px;
}
.register_body .register_btn button {
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}


.register_body .register_email{
    position: relative;
}

.register_body .register_email button{
    position: absolute;
    height: 30px;
    top:20px;
    right: 10px;
    border: none;
    border-radius: 4px;
    padding: 5px;
   


}

 .register_body .register_link {
  display: flex;
  justify-content: space-between;
}
 .register_body .register_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #e54847;
} 
</style>
