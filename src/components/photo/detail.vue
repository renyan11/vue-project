<template>
    <div class="tmpl">
        <mt-header title="图文详情">
            <router-link :to="{name:'photo.share'}" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="photo-title">
            <p>{{ picDetailsTitle }}</p>
        </div>
         <ul class="mui-table-view mui-grid-view mui-grid-9"> -->
             <li v-for="(img,index) in imgs" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"> 
                 <!-- <img :src="img.src"> -->
                <img :src="img.src" class="preview-img" @click="$preview.open(index,imgs)">
            </li>
           
        </ul> 
         <!-- <vue-preview :slides="imgs"></vue-preview> 高版本vue-preview需要使用vue-preview标签，取消$preview.open()-->
        <div class="photo-desc">
            <p v-html="picDetailsContent"></p>
        </div>

        <!-- 评论子组件 -->
        <Comment :picId="picId"></Comment>
    </div>
</template>
<script>
import Comment from '../common/comment.vue'
export default {
    data () {
        return {
            picDetailsTitle : '',
            picDetailsContent : '',
            imgs : [],
            picId : this.$route.params.id
        }
    },
    components : {
        Comment
    },
    created () {
        this.$axios.get('pictextcontent.json')
        .then(res => {
            res.data.message.forEach((element,index) => {
                if(element.id == this.picId){
                    this.picDetailsTitle = element.title,
                    this.picDetailsContent = element.zhaiyao
                }
            });
        })
        .catch(err => {
            console.log(err)
        })

        //请求所有图片
        this.$axios.get('photoimages.json')
        .then(res => {
            res.data.message.forEach((element,index) => {
                if(element.id == this.picId){
                    element.w = 600
                    element.h = 400
                    element.msrc = element.src
                    this.imgs.push(element)
                }
            });
        })
        .catch(err => {
            console.log(err)
        })
    }
}
</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 17px;
    font-weight: bold;
    margin-top: 5px;
    text-indent: 20px
}

.photo-title span {
    margin-right: 20px;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
}

.photo-desc p {
    font-size: 16px;
    color: black;
    text-indent: 25px;
    line-height: 25px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2 2;
    width:120px;
    height: 100px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 img{
    height:70%;
}

</style>
