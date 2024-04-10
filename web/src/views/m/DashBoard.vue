<template>
    <van-nav-bar :title="this.$route.name" @click-right="onClickRight">
        <template #right>
<!--            <van-badge dot>-->
                <van-icon name="bell" size="22" color="#979899"/>
<!--            </van-badge>-->
        </template>
    </van-nav-bar>

    <router-view/>

    <van-tabbar route safe-area-inset-bottom>
        <van-tabbar-item to="/index" icon="home-o">Home</van-tabbar-item>
        <van-tabbar-item to="/transition" icon="peer-pay">Transition</van-tabbar-item>
        <van-tabbar-item to="/wallet" icon="paid">Wallet</van-tabbar-item>
        <van-tabbar-item to="/user" icon="user-o">User</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
    name: "Home",
    components: {},
    data() {
        return {}
    },
    mounted() {
    },
    methods: {
        onClickRight() {
            this.$router.push({name: "Notification"});
        }
    }
};
</script>

<style scoped>

</style>