import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores';

import axios from 'axios'
Vue.prototype.axios = axios;

//过滤器  图片路径的wh(宽高)替换为传进来的arg  setWH为方法
Vue.filter('setWH',(url, arg)=>{
    return url.replace(/w\.h/, arg)
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
