<template>
    <div class="tmpl">
        <mt-header title="商品详情">
            <router-link :to="{name:'goods.list'}" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="outer-swiper">
            <div class="swiper">
                <Swipe :url="goodDetailUrl" :id="this.$route.query.goodId"></Swipe>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{ picDetails.title }}
                </span></li>
                <li class="price-li">市场价：
                    <s>￥{{ picDetails.market_price }}</s> 销售价：<span>￥{{ picDetails.sell_price }}</span></li>
                <li class="number-li">购买数量：
                    <span @click="removeGood">-</span>
                    <span>{{ goodNum }}</span>
                    <span @click="addGood">+</span>
                </li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="addCart">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <transition name="ball" @after-enter="afterEnter">
            <div class="ball" v-if="isShow"></div>
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>库存情况：{{ picDetails.stock_quantity }} 件</li>
                <li>上架时间：{{ picDetails.add_time | convertDate}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain @click="prodInfo">图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain @click="prodComment">商品评论</mt-button>
                </li>
            </ul>
        </div>
        
    </div>
</template>
<script>
import Swipe from '../common/swipe.vue'
import { Toast } from 'mint-ui'
import connect from '../common/connect.js'
import crudTools from '../common/crudTools.js'
export default {
    data () {
        return {
            picDetails : {},
            goodDetailUrl : 'goodslist.json',
            goodNum : 1,
            isShow : false
        }
    },
    created () {
        let id = this.$route.query.goodId
        //按需展示数据
        this.$axios.get('goodslist.json')
        .then(res => {
            if(id == 0){
                this.picDetails = res.data.message;
            }else{
                res.data.message.forEach((element,index) => {
                    if(element.id == id){
                        this.picDetails = element
                    }
                });
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    components:{
        Swipe
    },
    methods : {
        //移除商品
        removeGood () {
            if(this.goodNum > 1){
                this.goodNum--
            }else{
                Toast({
                    message: '不能再减少啦',
                    position: 'middle',
                    duration: 1500
                });
            }
            
        },
        //添加商品
        addGood(){
            if(this.goodNum < this.picDetails.stock_quantity){
                this.goodNum++
            }else{
                Toast({
                    message: '已经超出库存啦',
                    position: 'middle',
                    duration: 1500
                });
            }
        },
        //加入购物车
        addCart () {
            connect.$emit('addcartgood',this.goodNum)
            this.isShow  = true

            crudTools.addOrUpdateThings({
                'id' : this.picDetails.id,
                'num' : this.goodNum
            })

        },
        //处理过渡效果之后的行为
        afterEnter () {
            this.isShow  = false
        },
        //商品评论
        prodComment () {
            this.$router.push({
                name : 'goods.comment',
                query : { id : this.$route.query.goodId } //路由商品参数id
            })
        },
        //商品详情
        prodInfo () {
            this.$router.push({
                name : 'goods.info',
                query : { id : this.$route.query.goodId , name : 'goods' } //路由商品参数id
            })
        }
    }
}
</script>
<style scoped>
.ball-enter-active {
    animation: bounce-in 0.88s;
}

@keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
       transform: translate3d(140px, -50px, 0); 
    }
    75% {
        transform: translate3d(160px, 0px, 0);
    }
    100% {
        transform: translate3d(100px, 250px, 0);
    }
}

.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
    height : 180px
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}

</style>
