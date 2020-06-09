本项目为Vue3构建电影选购app,结合nodeJs搭建的后台, 不是管理员用户无法进入后台.主要实现的功能有：头部tab切换,上下拉刷新,全国城市定位字母索引,搜索保存历史数据, 邮箱注册登录修改密码等。
## get 技能
- 注册登录: 使用nodemailer.createTransport(设置发件人)发送邮件作邮箱验证, random生成随机数字验证码, setInterval设置倒计时, crypto密码加密, trek-captcha生成图形验证码。
- 城市页面: 根据首字母对城市进行划分, 右侧字母索引: toScrollTop(dom数组中第n个dom的offsetTop)
- 搜索页面: watch监听绑定的输入框值,发起数据请求.
- 后台管理: express搭建服务器, 只有在app端管理员角色才能进入后台,登录后进入个人中心，利用组内路由守卫beforeRouteEnter先调接口获取用户信息保存localStorage和vuex中

## Project setup
yarn install
### Compiles and hot-reloads for development
yarn run serve
### Compiles and minifies for production
yarn run build
### Run your tests
yarn run test
### Lints and fixes files
yarn run lint
### 运行效果
![image](https://github.com/xingzhegudu123/fly-vue3-demo/blob/feature-dev-1.0/public/imgReadme/accunt.png)
![image](https://github.com/xingzhegudu123/vue-cli3-Ts/blob/feature-dev-1.0/public/imgReadme/table.png)
![image](https://github.com/xingzhegudu123/vue-cli3-Ts/blob/feature-dev-1.0/public/imgReadme/vue3+ts.png)

```


See [Configuration Reference](https://cli.vuejs.org/config/).
