<template>
    <div class="tmpl">
        <mt-header title="商品展示">
            <router-link :to="{name:'home'}" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        
        <div class="page-loadmore">
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore :bottom-method="loadBottom" :auto-fill="isAutoFill"   :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul class="mui-table-view mui-grid-view page-loadmore-list">
                        <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="(good,index) in goodslist" :key="index">
                            <router-link :to="{name :'goods.detail',query:{goodId:good.id}}">
                                <img class="mui-media-object" :src="good.img_url">
                                <div class="mui-media-body">{{good.title}}</div>
                                <div class="desc">
                                    <div class="sell">
                                        <span>￥{{good.sell_price}}</span>
                                        <s>￥{{good.market_price}}</s>
                                    </div>
                                    <div class="detail">
                                        <div class="hot">
                                            热卖中
                                        </div>
                                        <div class="count">
                                            剩{{ good.stock_quantity}}件
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data () {
        return {
            goodslist : [],
            wrapperHeight : '',
            allLoaded : false ,//是否禁止触发上拉函数
            isAutoFill : false, //是否自动触发上拉函数
            num : 110,
            total : 0
        }
    },
    created () {
        this.loadMore();
    },
    mounted () {
        this.$nextTick( () => {
            this.wrapperHeight = document.documentElement.clientHeight -
            this.$refs.wrapper.getBoundingClientRect().top;
        })
    },
    methods : {
        //上拉更多
        loadBottom() {
             setTimeout(this.loadmoreConcat,1000)
        },
        loadMore() {
             //全部tab下展示数据
            this.$axios.get('goodslist.json')
            .then(res => {
                this.total = res.data.message.length + 100
                res.data.message.forEach(element => {
                    if(element.id < this.num){
                        this.goodslist.push(element)
                    }
                });
            })
            .catch(err => {
                console.log(err)
            })
        },
        loadmoreConcat () {
            this.num = this.num + 10
            this.$axios.get('goodslist.json')
            .then(res => {
                res.data.message.forEach(element => {
                    if(this.num < this.total){
                        this.goodslist.push(element)
                        this.$refs.loadmore.onBottomLoaded(); //通知loadmore组件从新渲染，计算
                    }else{
                        //禁止调用上拉函数
                        this.allLoaded = true
                    }
                });
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

}
</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: black;
    background-color: rgba(63, 48, 48, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}

.page-loadmore {
    margin-top: 10px;   /*mt-loadmore控件的父级必须加此属性否则下拉的loadBottom事件不会生效 */
    overflow: scroll;
}

.page-loadmore-list {
    min-height: 570px;
}

</style>
