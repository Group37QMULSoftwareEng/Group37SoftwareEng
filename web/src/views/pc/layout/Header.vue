<script setup>
import {onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {logList} from "@/api/logs";

const router = useRouter();
const store = useStore();
const logs = ref([]);

const jumpPage = (name) => {
    router.push({name});
}

const init = () => {
    // user is not login
    if (!store.state.user) {
        router.push({name: 'Login'});
    }
}

const logout = () => {
    store.commit('REMOVE_INFO');
    router.push('/');
}

const getUserLog = () => {
    logList({"user_id": store.state.user.id}).then((res) => {
        console.log(res);
        logs.value = res.data.list;
    })
}

onMounted(() => {
    init();
    getUserLog();
})
</script>

<template>
    <el-header class="header">
        <div class="header-container">
            <div class="logo" @click="jumpPage('Home')">
                <div class="logo-img">
                    <img src="/logo/logo.png">
                </div>
            </div>
            <div class="btn-group" v-if="!store.state.user">
                <div class="login">
                    <el-button type="primary" @click="jumpPage('Login')">Log in</el-button>
                </div>
                <div class="register">
                    <el-button @click="jumpPage('Register')">Sign up</el-button>
                </div>
            </div>
            <div class="btn-group" v-else>
                <el-popover
                    placement="bottom"
                    :width="300"
                    trigger="click"
                    v-if="store.state.user.role ===1"
                >
                    <template #reference>
                        <el-text class="welcome">
<!--                            <el-badge is-dot class="item">-->
                                <el-icon size="22">
                                    <Bell/>
                                </el-icon>
<!--                            </el-badge>-->
                        </el-text>
                    </template>

                    <div class="notice">
                        <div class="notice-item" v-for="log in logs">
                            <div class="notice-title-date">
                                <div class="notice-title">
                                    {{log.type}}
                                </div>
                                <div class="notice-date">
                                    {{log.create_at}}
                                </div>
                            </div>
                            <div class="notice-content" v-html="log.content"></div>
                        </div>
                    </div>
                </el-popover>

                <el-text class="welcome">
                    Welcome,{{ store.getters.getUserName }}
                    ({{ ['Admin', 'User', 'Service'][store.getters.getUser.role] }})
                </el-text>
                <el-dropdown>
                    <el-avatar :size="50" :src="store.getters.getUser.avatar">
                        {{ store.getters.getUserName }}
                    </el-avatar>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="logout">Sign out</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </el-header>
</template>


<style scoped>
.header {
    width: 100%;
    height: 80px;
    box-shadow: 0 5px 10px 0 rgba(17, 58, 93, 0.1);
    background: #171818;
    //background: #5470c6;
}

.welcome {
    color: white;
}

.header-container {
    height: 80px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    justify-content: space-evenly;
    gap: 10px;
    align-items: center;
    cursor: pointer;
}

.logo-img > img {
    width: 250px;
    height: 80px;
}

.btn-group {
    display: flex;
    justify-content: space-evenly;
    gap: 10px;
}

.logo > .logo-desc {
    font-size: 40px;
    line-height: 80px;
}


.btn-group .el-avatar {
    outline: none;
}

.notice {
    width: 96%;
    max-height: 500px;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.notice-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}

.notice-item:not(:last-child) {
    border-bottom: 1px solid #e1dede;
}

.notice-title {
    font-weight: bolder;
}

.notice-date {
    font-size: 14px;
    color: #ccc9c9;
}

.notice-title-date {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.notice-content {
    margin-top: 10px;
    margin-bottom: 20px;
}
</style>