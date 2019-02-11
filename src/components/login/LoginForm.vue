<template>
    <el-form ref="AccountForm" v-bind:rules="rules" v-bind:model="account" label-position="left" label-width="0px" class='login-container'>
        <el-form-item prop='username'>
            <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
            <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码(123)"></el-input>
        </el-form-item>
        <el-checkbox checked="checked" v-model="checked" class='remember'>记住密码</el-checkbox>
        <el-form-item class='login-btn'>
            <el-button type="primary" :loading="logining" @click.native.prevent="handelLogin">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name : 'login',
    data () {
        return {
            account : {
                username : '',
                pwd : ''
            },
            rules : {
                username : [{
                    required : true , message : '请输入账号' ,trigger : 'blur'
                }],
                pwd : [{
                    required : true , message : '请输入密码',trigger : 'blur'
                }]
            },
            checked : true,
            logining : false,
        }
    },
    methods : {
        handelLogin () {
            this.$refs.AccountForm.validate( valid => {
                if(!valid){
                    console.info('请先通过表单验证.');
                    return false;
                }else{
                    if(this.account.username !== '' && this.account.pwd === '123'){
                        this.logining = true;
                        this.$emit('onSuccess', this.account.username)
                    }else{
                        this.logining = false;
                        this.$message({
                            message : '密码错误',
                            type : 'error'
                        })
                        this.account.pwd = ''
                    }
                }
            })
        }
    }
}
</script>

<style>
body{
    background: white;
}
.login-container{
    width: 75%;
    margin-left: 12%;
    margin-top : 12%
}
.login-btn{
    width: 100%;
}
.login-btn button{
    width: 100%;
    margin-top: 20px;
}
</style>
