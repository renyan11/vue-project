<template>
    <div>
        <mt-header title="CMS信息管理系统">
            <mt-button  v-if="username === null" slot="left" @click="login">登录
            </mt-button>
            <mt-button  v-if="username !== null" slot="right" v-text="username" @click="loginOut">
            </mt-button>
        </mt-header>
        <transition name="router" mode="out-in">
            <router-view></router-view>
        </transition>
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" :to="{name:'home'}">
                <span class="mui-icon icon-shouye"></span>
				<span class="mui-tab-label">首页</span>
            </router-link>
			<router-link class="mui-tab-item" :to="{name:'vip'}">
                <span class="mui-icon icon-huiyuan"></span>
				<span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'shopcart'}">
                <span class="mui-icon icon-gouwuche">
                    <span class="mui-badge">{{ pickNum }}</span>
                </span>
				<span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'search'}">
                <span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">查找</span>
            </router-link>
		</nav>

        <my-dialog :isShow="isShowLogin" @onClose="onCloseMyDialog('isShowLogin')">
            <LoginForm @onSuccess="onSuccessLogin"></LoginForm>
        </my-dialog>
    </div>
</template>

<script>
import connect from './components/common/connect.js'
import crudTools from './components/common/crudTools.js'
import LoginForm from './components/login/LoginForm.vue'
import { MessageBox } from 'mint-ui';
export default {
    props: {

    },
    data() {
        return {
            isShowLogin : false,
            username : '',
            pickNum : crudTools.getTotal()
        };
    },
    computed: {

    },
    created() {
      /*this.$axios.get("https://www.layui.com/demo/table/user/",{
           headers :  {
               'content-type' : 'application/x-www-form-urlencoded'
           }
       })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        }) */
        connect.$on('addcartgood', (val) =>{
            setTimeout(() => {
                this.pickNum = this.pickNum + val
                return this.pickNum
            },900)
        })

        this.username = window.localStorage.getItem("username")
    },
    mounted() {
        
    },
    watch: {
       
    },
    methods: {
        //登录
        login () {
            this.isShowLogin = true
        },
        //关闭弹框
        onCloseMyDialog (showName) {
            this[showName] = false
        },
        //成功登录
        onSuccessLogin (data) {
          window.localStorage.setItem("username",data)
          this.username = window.localStorage.getItem("username")
          this.onCloseMyDialog('isShowLogin')
        },
        //退出
        loginOut (){
           MessageBox.confirm('确定退出操作?').then(action => {
               /*this.$router.push({
                    name : 'home'
                }) */ //不知道为什么不起作用
                window.localStorage.removeItem("username")
                window.localStorage.removeItem("crudObj")
                window.location.reload()
            },err => {
                console.log(err)
            });
            
        }
    },
    components: {
        LoginForm
    },
};
</script>

<style scoped>
    .mint-header{
        background-color: #b16ad5
    }

    /*页面淡入淡出效果*/
    .router-enter-active ,.router-leave-active{
        transition: opacity .3s;
    }
    .router-enter,.router-leave-to{
        opacity : 0;
    }
</style>


