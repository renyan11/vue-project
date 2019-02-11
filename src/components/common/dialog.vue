<template>
    <div>
        <div class="dialog-wrap" v-if="isShow">
            <div class="dialog-cover" @click="dialogClose"></div>
            <transition name="drop">
                <div class="dialog-content" v-if="isShow">
                    <p class="dialog-close" @click="dialogClose">X</p>
                    <slot>empty</slot>
                </div>
            </transition>
        </div>

    </div>
</template>

<script>
export default {
    props : {
        isShow : {
            type : Boolean,
            default : false
        }
    },
    methods : {
        dialogClose () {
            this.$emit('onClose')
        }
    }
}
</script>

<style scoped>
.drop-enter-active {
  transition: all 0.5s ease;
}
.drop-leave-active {
  transition: all 0.3s ease;
}
.drop-enter {
  transform: translateY(-500px);
}
.drop-leave-active {
  transform: translateY(-500px);
}
.dialog-wrap{
    position: fixed;
    width: 100%;
    height: 100%;
}
.dialog-cover{
    background: #000;
    opacity: .4;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.dialog-content {
    width : 80%;
    position: fixed;
    height: auto;
    overflow: auto;
    background: #fff;
    top: 20%;
    left: 10%;
    right: 10%;
    z-index: 3;
    border: 1px solid #464068;
    padding: 2%;
    line-height: 2em;
}
.dialog-close{
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
}
.dialog-close :hover{
    color: #4fc08d;
}
</style>


