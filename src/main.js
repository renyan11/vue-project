import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//引入自己组件
import App from './App.vue'
import Home from './components/home/Home.vue'
import LoginForm from './components/login/LoginForm.vue'
import VIP from './components/home/VIP.vue'
import ShopCart from './components/shopcart/shopcart.vue'
import Search from './components/search/search.vue'
import NewsList from './components/news/newsList.vue'
import NewsListDetail from './components/news/newsDetail.vue'
import PhotoShare from './components/photo/share.vue'
import PhotoShareDetail from './components/photo/detail.vue'
import GoodsList from './components/goods/goodslist.vue'
import GoodsDetail from './components/goods/goodDetail.vue'
import GoodsComment from './components/goods/goodComments.vue'

//引入全局组件nav-bar
import Dialog from './components/common/dialog.vue'
Vue.component('myDialog',Dialog)

//引入mint-ui
import MintUI from 'mint-ui'
import "mint-ui/lib/style.css"
Vue.use(MintUI)

//引入elementUI
import ElementUI from 'element-ui'
/*加载elementui */
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

//引入MUI的样式
import './static/vendor/mui/dist/css/mui.css'
//引入自定义全局样式
import './static/css/global.css'

//引入axios
import Axios from 'axios'
//挂载原型
Vue.prototype.$axios = Axios
//默认配置
Axios.defaults.baseURL = "http://localhost:9999/src/static/json/"
//拦截器操作loading 
Axios.interceptors.request.use((config) => {
    MintUI.Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    })
    return config
})

Axios.interceptors.response.use((config) => {
    setTimeout(() => {
        MintUI.Indicator.close()
    },200)
    return config
})

//引入moment
import Moment from 'moment'

Vue.filter("convertDate",(v) => {
    return Moment(v).format("YYYY/MM/DD HH:mm:ss")
})

//引入vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

let router = new VueRouter({
    linkActiveClass:'mui-active',
    routes : [
        {
            path : '/', redirect : { name : 'home'}
        },
        {
            path : '/login',  name : 'login',component : LoginForm
        },
        {
            path : '/home' ,name :'home',component : Home
        },
        {
            path : '/vip' ,name :'vip',component : VIP
        },
        {
            path : '/shopcart' ,name :'shopcart',component : ShopCart
        },
        {
            path : '/search' ,name :'search',component : Search
        },
        {
            path : '/newList' ,name :'news.list',component : NewsList
        },
        {
            path : '/newsDetail' ,name :'news.detail',component : NewsListDetail
        },
        {
            path : '/photoShare' ,name :'photo.share',component : PhotoShare
        },
        {
            path : '/photoShareDetail/:id' ,name :'photo.detail',component : PhotoShareDetail
        },
        {
            path : '/goodsList' ,name :'goods.list',component : GoodsList
        },
        {
            path : '/goodsDetail' ,name :'goods.detail',component : GoodsDetail
        },
        {
            path : '/goodsComment', name : 'goods.comment',component: GoodsComment
        },
        {
            path : '/goodsInfo', name : 'goods.info',component: NewsListDetail
        }
    ]
})

new Vue({
    el:"#app",
    router,
    render : h => h(App)
})