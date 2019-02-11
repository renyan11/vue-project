<template>
    <div class="tmpl">
        <mt-header title="新闻列表">
        <router-link :to="{name:'home'}" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
        </mt-header>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(news,index) in newslist" :key="index">
                <router-link :to="{name:'news.detail',query:{id:news.id,name:'news'}}">
                    <img class="mui-media-object mui-pull-left" :src="news.img_url">
                    <div class="mui-media-body">
                        <span>{{ news.title }}</span>
                        <div class="news-desc">
                            <p>点击数:{{ news.click }}</p>
                            <p>发表时间:{{ news.add_time | convertDate}}</p>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data () {
        return {
            newslist : []
        }
    },
    created () {
        this.$axios.get('newslist.json')
        .then(res => {
            this.newslist = res.data.message
        })
        .catch(err => {
            console.log(err)
        })
    }
}
</script>
<style scoped>
.mui-media-body p {
    color: #0bb0f5;
}

.news-desc p:nth-child(1) {
    float: left;
}

.news-desc p:nth-child(2) {
    float: right;
}
</style>
