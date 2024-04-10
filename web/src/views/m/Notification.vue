<script setup>
import {onMounted, ref} from 'vue';
import {useStore} from "vuex";
import moment from 'moment';
import {logList} from "@/api/logs.js";

const store = useStore()

const logs = ref([]);

const getUserLog = () => {
    logList({"user_id": store.state.user.id}).then((res) => {
        console.log(res);
        logs.value = res.data.list;
    })
}

onMounted(() => {
    getUserLog();
})
</script>


<template>
    <div class="container">
        <el-card class="card-item" v-for="item in logs">
            <template #header>
                <div class="card-header">
                    <div class="wallet-name-avatar">
                        <div class="wallet-name-balance">
                            <div class="wallet-name">
                               {{ item.type }}
                            </div>
                        </div>
                    </div>

                    <div class="wallet-address">
                        <div class="time">
                            <el-text type="info">
                                {{ moment(item.create_at).format("YYYY-MM-DD HH:mm:ss") }}
                            </el-text>
                        </div>
                    </div>
                </div>
            </template>
            <p class="card-text">
                {{ item.content }}
            </p>
        </el-card>

        <div class="bottom"></div>
    </div>
</template>

<style scoped>
.container {
    width: 94%;
    margin: 10px auto;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.wallet-name-avatar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
}

.card-item {
    margin: 10px 0;
    color: black;
}

.card-item:last-child {
    margin-bottom: 100px !important;
}

.wallet-name{
    color: #3c3f49;
}

.wallet-address {
    display: flex;
    justify-content: flex-end;
    /* align-items: center; */
    flex-direction: column;
    width: 140px;
    gap: 5px;
    text-align: right;
}

.wallet-name {
    font-size: 18px;
}

.card-text {
    color: #b2acac;
    font-size: 14px;
}

.bottom {
    width: 100%;
    height: 100px;
}
</style>