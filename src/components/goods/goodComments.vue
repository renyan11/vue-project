<template>
    <div>
    <mt-header title="商品评论">
        <router-link :to="{name:'goods.detail',query : {goodId : goodId}}" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <CommentVue :picId="goodId"></CommentVue>
    </div>
</template>
<script>
import CommentVue from '../common/comment.vue';
    export default {
        data(){
            return {
                goodId:'',
                title:'商品评论'
            }
        },
        created(){
            this.goodId = this.$route.query.id;
        },
        components:{
            CommentVue
        }
    }
</script>
<style>
    
</style>