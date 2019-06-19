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

import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'
Vue.component('Scroller',Scroller);
Vue.component('Loading',Loading);

Vue.config.productionTip = false



var bus = new Vue();
Vue.prototype.bus = bus;






new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
