<template>
    <div class="tmpl">
        <mt-header :title="title">
            <router-link :to="{name:activeName,query:{goodId:id}}" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="news-title">
            <p v-text="newsDetail.title">标题</p>
            <div>
                <span>{{newsDetail.click}}次点击</span>
                <span>添加时间:{{newsDetail.add_time | convertDate}}</span>
            </div>
        </div>
        <div class="news-content" v-html="newsDetail.zhaiyao"></div>
        <div class="news-imgurl">
            <img :src="newsDetail.img_url">
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            newsDetail : [],
            title : '',
            id : this.$route.query.id,
            name : this.$route.query.name,
            activeName : ''
        }
    },
    created () {
       if(this.name == 'news'){
            this.$axios.get('newslist.json')
            .then(res => {
                res.data.message.forEach((element,index) => {
                    if(element.id == this.id){
                        this.newsDetail = element
                    }
                });
            })
            .catch(err => {
                console.log(err)
            })
       }else if(this.name == 'goods'){
            this.$axios.get('goodslist.json')
            .then(res => {
                if(this.id == 0){
                    this.newsDetail = res.data.message;
                }else{
                    res.data.message.forEach((element,index) => {
                        if(element.id == this.id){
                            this.newsDetail = element
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
       }
       
    },
    //组件内钩子函数
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if(from.name == "news.list"){
                vm.title = "新闻详情"
                vm.activeName = 'news.list'
            }else if(from.name == "goods.detail"){
                vm.title = "图文介绍"
                vm.activeName = 'goods.detail'
            }
        })
    }
}
</script>
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}

.news-title span {
    margin-right: 30px;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}


/*主体文章的左右距离*/

.news-content {
    padding: 10 5;
    margin-top: 20px;
    line-height: 35px;
    font-size: 16px;
    text-indent: 35px;
}

.news-imgurl {
    width:100px;
    height:100px;
}
.news-imgurl img{
    height:100%;
    margin-left: 50%;
}
</style>
