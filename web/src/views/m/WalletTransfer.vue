<script setup>
import {ref, reactive, onMounted, computed, watch} from 'vue';
import {useStore} from "vuex";
import {walletList, walletTransfer} from "@/api/wallet";
import {ElMessage} from "element-plus";
import {coinList} from "@/api/coin.js";
import {useRouter} from "vue-router";

const store = useStore()
const router = useRouter();

const coins = ref([]);
const amount = ref(0);
const wallets = ref([]);
const from_wallet_id = ref();
const to_wallet_id = ref();

// source currency
const from_currency = computed(() => {
    const coin_id = wallets.value.find(item => item.id === from_wallet_id.value)?.coin_id;
    return coins.value.find(item => item.id === coin_id)?.name;
});

// target currency
const to_currency = computed(() => {
    const coin_id = wallets.value.find(item => item.id === to_wallet_id.value)?.coin_id;
    return coins.value.find(item => item.id === coin_id)?.name;
});

// usd
const usd = computed(() => {
    const coin_id = wallets.value.find(item => item.id === from_wallet_id.value)?.coin_id;
    return coins.value.find(item => item.id === coin_id)?.rate * amount.value;
});

// target usd
const target_usd = computed(() => {
    const coin_id = wallets.value.find(item => item.id === to_wallet_id.value)?.coin_id;
    return usd.value / coins.value.find(item => item.id === coin_id)?.rate;
});

// listen amout value
watch(amount, () => {
    if (amount.value > wallets.value.find(item => item.id === from_wallet_id.value)?.balance) {
        amount.value = wallets.value.find(item => item.id === from_wallet_id.value)?.balance
    }
});

// listen from wallet change
watch(from_wallet_id, () => {
    amount.value = 0
});

// // listen to wallet change
// watch(to_wallet_id, () => {
//     amount.value = 0
// });

// get all currency
const getCoinList = async () => {
    let res = await coinList();
    if (res.code === 200) {
        coins.value = res.data
    } else {
        ElMessage.error('Get coin list failed, please try again!');
    }
}

const getWalletList = async () => {
    const res = await walletList({"user_id": store.state.user.id, "page": 1, "page_size": 100});
    if (res.code === 200) {
        wallets.value = res.data.list
    } else {
        ElMessage.error('Get user wallet list failed, please try again!');
    }
}

// wallet transfer
const handleWalletTransfer = async () => {
    const data = {
        amount: amount.value,
        from_wallet_id: from_wallet_id.value,
        to_wallet_id: to_wallet_id.value
    }

    if (data.amount <= 0) {
        ElMessage.error('Please enter the correct amount!');
        return
    }

    if (data.from_wallet_id === data.to_wallet_id) {
        ElMessage.error('Please select different currencies!');
        return
    }

    const res = await walletTransfer(data);

    if (res.code === 200) {
        amount.value = 0
        to_wallet_id.value = ""
        from_wallet_id.value = ""
        ElMessage.success('Transfer successful!');
    } else {
        ElMessage.error('Create wallet failed, please try again!');
    }
}

// jump to wallet transfer
const handleUserTransfer = () => {
    router.push({name: "Transition"})
}

onMounted(() => {
    getCoinList()
    getWalletList()
})
</script>

<template>
    <el-container>
        <el-main>
            <el-header>
                <h1 class="title">WalletTransfer</h1>
                <h5 class="description">Personal wallet transactions</h5>
            </el-header>

            <el-row type="flex" justify="center" class="el-row-margin">
                <el-col :span="22">
                    <el-input :controls="false" v-model="amount"
                              size="large"
                              :placeholder="'balance:' + wallets.find(item => item.id === from_wallet_id)?.balance"
                              tabIndex="-1">
                    </el-input>
                </el-col>
            </el-row>

            <el-row type="flex" justify="center" class="el-row-margin">
                <el-col :span="22">
                    <el-select v-model="from_wallet_id" size="large" placeholder="From Currency" filterable clearable>
                        <el-option
                            v-for="row in wallets"
                            :key="row.id"
                            :label="row.name + ' - ' +(coins.find(item => item.id === row.coin_id)?.name)+' - (balance:' + row.balance+')'"
                            :value="row.id"
                        />
                    </el-select>
                </el-col>
            </el-row>

            <el-row type="flex" justify="center" class="el-row-margin">
                <el-col :span="22">
                    <el-select v-model="to_wallet_id" size="large" placeholder="To Currency" filterable clearable>
                        <el-option
                            v-for="row in wallets"
                            :key="row.id"
                            :value="row.id"
                            :label="row.name + ' - ' +(coins.find(item => item.id === row.coin_id)?.name)+' - (balance:' + row.balance+')'"
                        />
                    </el-select>
                </el-col>
            </el-row>

            <el-row type="flex" justify="center" class="el-row-top">
                <el-text type="warning" v-if="amount && from_currency && to_currency">
                    {{ amount }} {{ from_currency }} = {{ usd }}(USD) = {{ target_usd }} {{ to_currency }}
                </el-text>
            </el-row>

            <el-row type="flex" justify="center" class="el-row-top">
                <el-col :span="22">
                    <van-button type="primary" round block native-type="submit"
                                @click.native.prevent="handleWalletTransfer">
                        Transfer
                    </van-button>
                </el-col>

            </el-row>

            <el-row type="flex" justify="center" class="el-row-top">
                <el-col :span="22">
                    <van-button round block native-type="submit" @click.native.prevent="handleUserTransfer">
                        User Transfer
                    </van-button>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<style scoped>
.title {
    text-align: center;
    font-size: 30px;
    color: black;
}

.el-main {
    width: 96%;
    height: 100%;
    background-color: #f0f2f5;
}

.el-row-margin {
    margin-top: 50px;
}

.el-row-top {
    margin-top: 20px;
}

.description{
    text-align: center;
    color: #5e5858;
}
</style>