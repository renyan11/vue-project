<template>
    <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <!-- <span><a >返回</a></span> -->
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model = "message"></textarea>
                </li>
                <li>
                    <mt-button type="primary" size="large" @click="speakComment">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>{{ this.comments == null ? 0 : this.comments.length }}条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(com,index) in comments" :key="index">
                    匿名用户：{{ com.comment_content }}  {{ com.comment_time }}
                </li>
                <br>
            </ul>
        </div>
    </div>
</template>
<script>
import Moment from 'moment'
import {Toast} from 'mint-ui'
export default {
    data () {
        return {
            comments: [],//评论数组
            message : ''//发布的评论数据
        }
    },
    created () {
        //评论
        this.loadFirst();
    },
    props : ['picId'],
    methods : {
        loadFirst() {
            if(window.localStorage.getItem(this.picId + "newMessage") == null){
                //加载初始评论信息
                this.$axios.get('comment.json')
                .then(res => {
                    res.data.message.forEach((element,index) => {
                        if(element.id == this.picId){
                            element.msrc = element.src
                            this.comments.push(element)
                        }
                    });
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                this.comments = window.JSON.parse(window.localStorage.getItem(this.picId + "newMessage"))
            }
        },
        //发布评论
        speakComment () {
            if(this.message == ''){
                Toast('请先进行评论！');
                return;
            }
            this.comments.unshift({
                id : this.picId,
                comment_time : Moment().utc().format('YYYY-MM-DD HH:mm:ss'),
                comment_content : this.message
            })
            //h5会话缓存
            window.localStorage.setItem(this.picId + "newMessage",window.JSON.stringify(this.comments)) 
            this.message = ""
        }
    }
}
</script>
<style scoped>
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
    margin-top: 10px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
</style>
