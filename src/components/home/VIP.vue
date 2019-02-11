<template>
    <div>
        <div v-if="username === null">
            请先进行登录成为会员。
        </div>
        <div v-if="username !== null">
            {{ username }} 会员,您好！
        </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            username : ''
        };
    },
    computed: {

    },
    created() {
        
    },
    mounted() {
        this.username = window.localStorage.getItem("username")
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

</style>
