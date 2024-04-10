<script setup>
import {onMounted} from 'vue';
import {useStore} from 'vuex'

const store = useStore();
</script>

<template>
    <div class="user-panel">
        <el-card>
            <div class="card-header">
                <van-image
                    width="4rem"
                    height="4rem"
                    round
                    fit="cover"
                    position="left"
                    :src="store.state.user.avatar"
                />
            </div>
            <div class="card-content">
                {{ store.state.user.username }}
            </div>
        </el-card>
    </div>

    <div class="menu">
        <van-cell-group>
            <van-cell title="Transaction Sent" icon="passed" to="/send" is-link/>
            <van-cell title="Transactions Received" icon="guide-o" to="/receive" is-link/>
            <van-cell title="Setting" icon="setting-o" to="/user/detail" is-link/>
            <van-cell title="Logout" icon="revoke" to="/login" is-link/>
        </van-cell-group>
    </div>
</template>

<style scoped>
.user-panel {
    margin: 10px auto;
    width: 96%;
}

.card-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.card-content {
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.menu {
    width: 96%;
    margin: auto;
}
</style>