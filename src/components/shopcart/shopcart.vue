<template>
    <div class="tmpl">
        <mt-header title="购物车">
            <router-link :to="{name:'home'}" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="(good,index) in goodsList" :key="index">
                    <mt-switch v-model="good.isPick"></mt-switch>
                    <img :src="good.img_url">
                    <div class="pay-calc">
                        <p v-text="good.title"></p>
                        <div class="calc">
                            <span>库存 : </span>
                            {{ good.stock_quantity }} 件
                        </div>
                        <div class="calc">
                            <span>￥{{ good.sell_price }}</span>
                            <span @click="removeGood(index)"> - </span>
                            <span>{{ good.number}}</span>
                            <span @click="addGood(index)"> + </span>
                            <a href="javascript:;" @click="deleteGood(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.num}}件，总价￥{{payment.sum}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large" @click="goPrice">去结算</mt-button>
            </div>
        </div>
        <my-dialog :isShow="isShowPrice" @onClose="onCloseMyDialog('isShowPrice')">
            <div>{{ username }} 会员你好<br/>您一共消费￥{{ payment.sum }}元</div>
        </my-dialog>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import crudTools from '../common/crudTools.js'
import connect from '../common/connect.js'

export default {
    data(){
        return {
            goodsList:[],//商品数组数据
            isPick : false,
            isShowPrice : false,
            username : ''
        }
    },
    created () {
        this.getLocalData()
    },
    methods : {
        getLocalData(){
            //获取local数据
            let goods = crudTools.getCrud();
            let keys = Object.keys(goods)
            if(keys != null){
                keys.forEach(ele => {
                    this.loadData(ele,goods)
                })
            }
        },
        loadData (goodId,goods) {
            this.goodsList = []
            this.$axios.get('goodslist.json')
            .then(res => {
                if(goodId == 0){
                    this.goodsList = res.data.message;
                }else{
                    res.data.message.forEach((element,index) => {
                        if(element.id == goodId){
                            //element.number = goods[goodId]
                            //挂载属性赋值实现监视
                            this.$set(element,'number',goods[goodId])
                            this.$set(element,'isPick',true)
                            this.goodsList = this.goodsList.concat(element)
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        //减少商品
        removeGood (index) {
            if(this.goodsList[index].number > 1){
                this.goodsList[index].number--
                connect.$emit("addcartgood",-1)
                //更新local缓存
                crudTools.addOrUpdateThings({
                    id : this.goodsList[index].id,
                    num : -1 //缓存-1
                })
            }else{
                Toast({
                    message: '不能再减少啦',
                    position: 'middle',
                    duration: 1500
                });
            }
        },
        //增加商品
        addGood (index) {
            if(this.goodsList[index].number < this.goodsList[index].stock_quantity){
                this.goodsList[index].number++
                connect.$emit("addcartgood",1)
                //更新local缓存
                crudTools.addOrUpdateThings({
                    id : this.goodsList[index].id,
                    num : 1 //缓存+1
                })
            }else{
                Toast({
                    message: '已经超出库存啦',
                    position: 'middle',
                    duration: 1500
                });
            }

        },
        //删除商品
        deleteGood (index) {
            crudTools.deleteThings(this.goodsList[index].id)
            //1.this.getLocalData()
            //2.
            connect.$emit("addcartgood",-this.goodsList[index].number)
            this.goodsList.splice(index,1)
        },
        //结算商品
        goPrice () {
             if(window.localStorage.getItem("username") === null){
                Toast({
                    message: '请先进行登录成为会员才能购买',
                    position: 'middle',
                    duration: 1500
                });
                return
            }else{
                this.username = window.localStorage.getItem("username")
                if(this.payment.sum == 0){
                    Toast({
                        message: '请先选购商品',
                        position: 'middle',
                        duration: 1500
                    });
                    this.$router.push({
                        name : 'goods.list'
                    })
                }else{
                    this.isShowPrice = true
                }
            }
        },
        //关闭弹框
        onCloseMyDialog (showName) {
            this[showName] = false
        },
    },
    computed : {
        payment () {
            //1.商品没被勾选，不计算总金额
            //2.选中的，计算总金额
            let num = 0
            let sum = 0
            this.goodsList.forEach((ele,index) => {
                if(ele.isPick){
                    //选中
                    sum += ele.number * ele.sell_price
                    num += ele.number
                }
            })

            return {
                num,
                sum
            }
        }
    }

}



</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.p-list {
    padding-left : 10%
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
    margin-left : 12%
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
    margin-top:8px
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-icon .mui-badge {
    animation: bounce-out 0.88s;
}

@keyframes bounce-out {
    0% {
        transform: scale(0)
    }
    50% {
       transform: scale(0.8)
    }
    75% {
        transform: scale(1.5)
    }
    100% {
        transform: scale(1)
    }
}
</style>
