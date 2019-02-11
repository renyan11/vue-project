<template>
    <mt-swipe :auto="3000">
        <mt-swipe-item v-for="(img,index) in imgs" :key="index">
            <a :href="img.img_url">
                <img :src="img.img_url">
            </a>
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
    props: ['url','id'],
    data() {
        return {
            imgs : []
        };
    },
    computed: {

    },
    created() {
        this.$axios.get(this.url)
        .then(res => {
            if(this.url.indexOf('goodslist') < 0){
                this.imgs = res.data.message
            }else{
                res.data.message.forEach(element => {
                    if(this.id == element.id){
                        //存入五遍形成轮播形式
                        this.imgs.push({"img_url":element.img_url})
                        this.imgs.push({"img_url":element.img_url})
                        this.imgs.push({"img_url":element.img_url})
                        this.imgs.push({"img_url":element.img_url})
                        this.imgs.push({"img_url":element.img_url})
                    }
                });
            }
        })
        .catch(err => {
            console.log(err)
        })
       
    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped>
/*轮播图样式*/
.mint-swipe{
    max-height: 190px;
}
.mint-swipe img{
    height: 100%;
}
</style>
