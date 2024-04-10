<script setup>
import {onMounted, ref} from 'vue';
import {showConfirmDialog, showNotify} from "vant";
import {useStore} from "vuex";
import {useRoute, useRouter} from 'vue-router';
import {walletDelete, walletList, walletUpdate} from "@/api/wallet";
import {coinList} from "@/api/coin.js";

const store = useStore()
const router = useRouter();
const route = useRoute();

const bgs = ref([
    'rgba(21,133,241,0.89)',
]);

const coins = ref([]);
const query = ref({});
const dataList = ref([]);

const walletForm = ref({});

// copy wallet id
const copyWalletId = (id) => {
    const textarea = document.createElement('textarea');
    textarea.value = id;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showNotify({type: 'success', message: 'Copied!'});
}

// randomChoice
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// hidden
function formatString(str) {
    if (str.length <= 8) {
        return str;
    }
    var prefix = str.substring(0, 4);
    var suffix = str.substring(str.length - 4);
    var middle = '...';
    return prefix + middle + suffix;
}

// get all currency
const getCoinList = async () => {
    const res = await coinList();
    if (res.code === 200) {
        // console.log(res.data)
        coins.value = res.data
        getDataList()
    } else {
        showNotify({type: 'danger', message: 'Get coin list failed, please try again!'});
    }
}

// get user wallet
const getDataList = async () => {
    query.value.user_id = store.state.user.id
    const res = await walletList(query.value);
    if (res.code === 200) {
        const data = res.data.list.filter(item => item.id == route.query.id);
        walletForm.value = data[0];
        dataList.value = data;
    } else {
        showNotify({type: 'danger', message: 'Get user wallet list failed, please try again!'});
    }
}

// handleClickWallet
const handleUpdateWallet = async () => {
    const res = await walletUpdate(walletForm.value);
    if (res.code === 200) {
        showNotify({type: 'success', message: 'Update wallet success!'});
    } else {
        showNotify({type: 'danger', message: res.msg});
    }
}

// handleClickWallet
const handleDeleteWallet = async () => {
    showConfirmDialog({
        title: 'Tips?',
        message: 'Confirm to delete?',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
    }).then(async () => {
        const res = await walletDelete(walletForm.value.id);
        if (res.code === 200) {
            showNotify({type: 'success', message: 'Delete wallet success!'});
            router.push({name: 'Wallet'})
        } else {
            showNotify({type: 'danger', message: res.msg});
        }
    }).catch(() => {
        // on cancel
    });
}

const handleBack = () => {
    router.go(-1)
}

onMounted(() => {
    getCoinList()
})
</script>

<template>
    <div class="container">
        <el-card class="card-item" :style="{backgroundColor: randomChoice(bgs)}"
                 v-for="item in dataList">
            <template #header>
                <div class="card-header">
                    <div class="wallet-name-avatar">
                        <div class="avatar">
                            <el-avatar :size="50">
                                {{ coins.find(row => row.id === item.coin_id).name }}
                            </el-avatar>
                        </div>
                        <div class="wallet-name-balance">
                            <div class="wallet-name">{{ item.name }}</div>
                            <div class="balance">{{ item.balance }} {{
                                    coins.find(row => row.id === item.coin_id).name
                                }}
                            </div>
                        </div>
                    </div>

                    <div class="wallet-address" @click="copyWalletId(item.hash_id)">
                        {{ formatString(item.hash_id) }}
                        <el-icon>
                            <CopyDocument/>
                        </el-icon>
                    </div>
                </div>
            </template>
            <p class="card-text">
                {{ item.description }}
            </p>
        </el-card>
        <div class="menu">
            <van-cell-group>
                <van-field v-model="walletForm.name" label="Name" placeholder="Enter wallet name"/>
                <van-field v-model="walletForm.balance" label="Balance" placeholder="Enter wallet balance"/>
                <van-field
                    v-model="walletForm.description"
                    rows="2"
                    autosize
                    label="Description"
                    type="textarea"
                    maxlength="50"
                    placeholder="Enter wallet description"
                    show-word-limit
                />
            </van-cell-group>

            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit" @click="handleUpdateWallet">
                    Submit
                </van-button>
            </div>
            <div style="margin: 16px;">
                <van-button round block type="danger" native-type="submit" @click="handleDeleteWallet">
                    Delete
                </van-button>
            </div>
            <div style="margin: 16px;">
                <van-button round block native-type="submit" @click="handleBack">
                    Back
                </van-button>
            </div>
        </div>

        <div class="bottom"></div>
    </div>
</template>

<style scoped>
.container {
    width: 96%;
    margin: 10px auto;
}

.menu {
    width: 96%;
    margin: 10px auto;
    //height: 200px;
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
    margin: 10px 10px;
    color: white;
}

.card-item:last-child {
    margin-bottom: 100px !important;
}

.wallet-address {
    display: flex;
    justify-content: flex-start;
    /* align-items: center; */
    flex-direction: row;
    width: 100px;
    gap: 5px;
}

.wallet-name {
    font-size: 20px;
}

.balance {
    color: #f0f2f5;
    font-size: 14px;
}

.bottom {
    width: 100%;
    height: 100px;
}
</style>