<template>
 
    
    
       <div class="centerView"> 
            <div>个人中心:</div>
          <div>当前用户: {{ $store.state.user.name }} <a href="javascript:void(0)"  @touchstart="handleToLogout" >退出</a> </div>
          <div v-if="$store.state.user.isAdmin">用户身份:管理员 <a href="/admin" target="_blank"> 进入管理后台</a>             </div>
            <div v-else>用户身份:普通会员</div>
            <div>
                 <input  type="file" name="file" value="上传头像" @change = "handleToUpload" />
                 <img  class="upImg" :src="$store.state.user.userHead" alt="" />
            </div>
       </div>
       
    
</template>

<script>
import axios from "axios";
import { messageBox } from '@/components/JS';
export default {
   name : 'center',
   components: {
   
    // TabBar
  },
  methods : {
    // 退出
     handleToLogout(){
        this.axios.get('/api2/users/logout').then(res=>{  
           var status = res.data.status;
           if(status===0){
              localStorage.removeItem('name');
              localStorage.removeItem('isAdmin');
              this.$store.commit('user/USER_NAME',{ name: '', isAdmin: false, userHead:'' });
              this.$router.push('/mine/login');
           }
        });
     },

      handleToUpload(even){
       var file = even.target.files[0];
       var param = new FormData();
       param.append('file', file, file.name);

       var config = {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
       };

       this.axios.post('/api2/users/ubloadUserHead', param, config).then(res=>{
            var status = res.data.status;
            var that = this;
            if( status===0 ){
                    messageBox({
                        title: '信息',
                        content: '上传成功',
                        ok: '确定',
                        handleOk(){
                          console.log('ssss');
                              that.$store.commit('user/USER_NAME',{ 
                                  name : that.$store.state.user.name, 
                                  isAdmin : that.$store.state.user.isAdmin,
                                  userHead : res.data.data.userHead + '?'+ Math.random(),

                                });
                            
                          }
               });




            }else{
                   messageBox({
                     title:'信息',
                     content:'上传头像失败',
                     ok :'确定',
                     handleOk(){
                       
                     }

                  })      
            }
       });

     }
   
  },
   // 路由守卫  -- 进入个人中心前判断是否登录
    beforeRouteEnter (to, from, next) {
       
         axios.get('/api2/users/getUser').then((res)=>{
          
             var status = res.data.status;
            
             if(status === 0){ // 能获取到个人信息代表已经登录
                   console.log(res.data.data);
                   next(vm=>{
                     localStorage.setItem('name',   res.data.data.username);
                     localStorage.setItem('isAdmin',  res.data.data.isAdmin);
                     vm.$store.commit('user/USER_NAME',{ 
                       name : res.data.data.username, 
                       isAdmin : res.data.data.isAdmin,
                       userHead : res.data.data.userHead

                          });
                   });
             }else{
                 next('/mine/login');   
             }
         })
        
     },
    
 
}
</script>

<style scoped>

.centerView{
  position: absolute;
  left: 0;
  top: 50px;

}

.centerView a{
  text-decoration : none;

}
.upImg{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}

</style>
