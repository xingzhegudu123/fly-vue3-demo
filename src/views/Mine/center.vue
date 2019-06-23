<template>
 
    
    
       <div class="centerView"> 
            <div>个人中心:</div>
          <div>当前用户: {{ $store.state.user.name }} <a href="javascript:void(0)"  @touchstart="handleToLogout" >退出</a> </div>
          <div v-if="$store.state.user.isAdmin">用户身份:管理员 <a href="/admin" target="_blank"> 进入管理后台</a>             </div>
            <div v-else>用户身份:普通会员</div>
       </div>
       
    
</template>

<script>
import axios from "axios";
export default {
   name : 'center',
   components: {
   
    // TabBar
  },
  methods : {
     handleToLogout(){
      
        this.axios.get('/api2/users/logout').then(res=>{  // 退出
           var status = res.data.status;
           if(status===0){
              localStorage.removeItem('name');
              localStorage.removeItem('isAdmin');
              this.$store.commit('user/USER_NAME',{ name: '', isAdmin: false });
              this.$router.push('/mine/login');
           }
        });
     },
   
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
                     vm.$store.commit('user/USER_NAME',{ name : res.data.data.username, isAdmin : res.data.data.isAdmin });
                   });
             }else{
                 next('/mine/login');   
             }
         });
     }
 
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

</style>
