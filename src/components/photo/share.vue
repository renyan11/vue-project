<template>
    <div class="tmpl">
         <mt-header title="图文分享">
            <router-link :to="{name:'home'}" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul class="img-active">
                <li v-for="(ps,index) in photoshare" :key="ps.id">
                    <a href="javascript:;" @click="loadImg(ps.id,ps.actived)" :class="{'active': ps.actived}">
                        {{ps.title}}
                    </a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="pc in picDetails">
                    <router-link :to="{name:'photo.detail',params : {id:pc.id}}">
                        <img :src="pc.img_url"> <!-- :src="pc.img_url" -->
                        <p>
                            <span v-html="pc.title"></span>
                            <br>
                            <span v-html="pc.zhaiyao"></span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            photoshare : [],
            photoshareActive : [],
            picDetails : []
        }
    },
    created () {
        this.$axios.get('pictextclassify.json')
        .then(res => {
            console.log(res.data.message)
            this.photoshare = res.data.message;
            this.photoshare.unshift({
                id : '0',
                title : '全部',
                actived : true
            })
        })
        .catch(err => {
            console.log(err)
        });

        //全部tab下展示数据
        this.$axios.get('pictextcontent.json')
        .then(res => {
            this.picDetails = res.data.message;
        })
        .catch(err => {
            console.log(err)
        })
    },
    methods : {
        loadImg (imgId,actived) {
            this.photoshareActive = [];
            this.photoshare.forEach((elem,index) => {
                if(elem.id == imgId){
                    elem.actived = true;
                }else{
                    elem.actived = false;
                }
                this.photoshareActive.push(elem)
            })
            this.photoshare = this.photoshareActive
            //按需tab下展示数据
            this.$axios.get('pictextcontent.json')
            .then(res => {
                if(imgId == 0){
                    this.picDetails = res.data.message;
                }else{
                     res.data.message.forEach((element,index) => {
                        if(element.id == imgId){
                            this.picDetails = [];
                            this.picDetails.push(element)
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
            
        }
    }
}
</script>
<style>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 15px;
    height: 20px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}

.img-active a[class='active']{
    text-decoration : underline;
    color: #e11d1d;
}
/*下面的图片*/
.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
    height: 64px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}

/*图片懒加载样式*/
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}

</style>
