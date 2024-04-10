<script setup>
import {onMounted, ref} from 'vue';
import {showNotify} from "vant";
import {useStore} from "vuex";
import {useRouter} from 'vue-router';
import {walletDelete, walletList} from "@/api/wallet";
import {coinList} from "@/api/coin.js";

const store = useStore();
const router = useRouter();

const bgs = ref([
    'rgba(21,133,241,0.89)',
]);

const coins = ref([]);
const query = ref({});
const dataList = ref([]);

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
    } else {
        showNotify({type: 'danger', message: 'Get coin list failed, please try again!'});
    }
}

// get user wallet
const getDataList = async () => {
    query.value.user_id = store.state.user.id
    const res = await walletList(query.value);
    if (res.code === 200) {
        dataList.value = res.data.list
    } else {
        showNotify({type: 'danger', message: 'Get user wallet list failed, please try again!'});
    }
}

// handleClickWallet
const handleClickWallet = (item) => {
    router.push({"name": "WalletDetail", query: {"id": item.id}})
}

// handleAddWallet
const handleAddWallet = () => {
    router.push({name: "CreateWallet"})
}

onMounted(() => {
    getCoinList()
    getDataList()
})
</script>

<template>
    <div class="container">
        <template v-if="dataList">
            <el-card class="card-item" @click="handleClickWallet(item)" :style="{backgroundColor: randomChoice(bgs)}"
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

                        <div class="wallet-address" @click.stop="copyWalletId(item.hash_id)">
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
        </template>

        <el-card class="card-item add-wallet" @click="handleAddWallet">
            <div>
                <el-icon color="#b9b3b3" :size="30">
                    <Plus/>
                </el-icon>
            </div>
            <div class="add-desc">
                Add Wallet
            </div>
        </el-card>
        <div class="bottom"></div>
    </div>
</template>

<style scoped>
.container {
    width: 96%;
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

.add-wallet {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px 0;
}

.add-desc {
    font-size: 20px;
    color: #b9b3b3;
}
</style>