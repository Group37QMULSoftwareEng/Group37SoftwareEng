<script setup>
import {ref, reactive, onMounted} from 'vue';
import {useStore} from "vuex";
import {walletAdd, walletList} from "@/api/wallet";
import {ElMessage, ElMessageBox} from "element-plus";
import {coinList} from "@/api/coin.js";
import {transactionAdd} from "@/api/transaction.js";
import {walletAddressList, walletAddressAdd, walletAddressDelete} from "@/api/address.js";

const store = useStore()

const wallets = ref([]);
const coins = ref([]);
const transferForm = reactive({});
const addressList = ref([]);

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

// add wallet
const handleAddTransaction = async () => {
    transferForm.user_id = store.state.user.id
    if (transferForm.to_wallet_id === transferForm.from_wallet_id) {
        ElMessage.error('Please select different wallet!');
        return
    }

    if (transferForm.amount <= 0 || transferForm.amount === '') {
        ElMessage.error('Please enter the correct amount!');
        return
    }

    if (transferForm.amount > wallets.value.find(item => item.hash_id === transferForm.from_wallet_id)?.balance) {
        ElMessage.error('Insufficient balance!');
        return
    }

    let res = await transactionAdd(transferForm);

    if (res.code === 200) {
        // clear form
        transferForm.to_wallet_id = '';
        transferForm.from_wallet_id = '';
        transferForm.amount = '';
        transferForm.description = '';
        await getWalletList();
        ElMessage.success('Create Transaction successful!');
    } else {
        ElMessage.error(res.msg);
    }
}

// get all address
const getWalletAddressList = async () => {
    const res = await walletAddressList({"user_id": store.state.user.id});
    if (res.code === 200) {
        addressList.value = res.data.list
    }
}

// save address
const handleSaveAddress = async () => {
    const remark = await ElMessageBox.prompt('Please input address remark', 'Tips', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
    })

    if (!remark.value) {
        ElMessage.error('Please input address remark!');
        return
    }

    const saveAddress = await walletAddressAdd({
        "user_id": store.state.user.id,
        "remark": remark.value,
        "address": transferForm.to_wallet_id
    });

    console.log(saveAddress)
    if (saveAddress.code === 200) {
        getWalletAddressList()
        ElMessage.success('Save address successful!');
    } else {
        ElMessage.error(saveAddress.msg);
    }
}

const handleDeleteAddress = async (item) => {
    const res = await walletAddressDelete(item.id)
    if (res.code === 200) {
        getWalletAddressList()
        ElMessage.success('Delete address successful!');
    } else {
        ElMessage.error(res.msg);
    }
}

onMounted(() => {
    getCoinList()
    getWalletList()
    getWalletAddressList()
})
</script>

<template>
    <el-container>
        <el-main>
            <el-header>
                <h1 class="title">Create Transition</h1>
                <h5 class="description">Inter-user transactions</h5>
            </el-header>

            <el-row type="flex" justify="center">
                <el-col :span="8">
                    <el-form ref="transferFormRef" :model="transferForm" class="login-form"
                             auto-complete="on"
                             label-position="left">
                        <el-form-item prop="hash_id">
                            <el-input v-model="transferForm.to_wallet_id" placeholder="Receiver‘s wallet address"
                                      size="large"
                                      tabIndex="-1">
                            </el-input>

                            <el-select
                                v-model="transferForm.to_wallet_id"
                                placeholder="Wallet Address"
                                clearable
                                style="margin-right:5px;margin-top:10px;width:150px;"
                            >
                                <el-option v-for="item in addressList" :key="item.id"
                                           :label="item.address + ' - ' + item.remark"
                                           :value="item.address">
                                    <span style="float: left;margin-right:30px;">{{ item.remark }}</span>
                                    <span
                                        style="float: right; color: #8492a6; font-size: 13px"
                                    >
                                        <el-tag type="danger" @click.stop="handleDeleteAddress(item)">Delete</el-tag>
                                    </span
                                    >
                                </el-option>
                            </el-select>

                            <el-tag style="margin-top:5px;" v-if="transferForm.to_wallet_id" @click="handleSaveAddress">
                                Save address
                            </el-tag>
                        </el-form-item>
                        <el-form-item prop="name">
                            <el-select v-model="transferForm.from_wallet_id" placeholder="Select wallet" filterable
                                       clearable>
                                <el-option
                                    v-for="item in wallets"
                                    :key="item.id"
                                    :label="item.name + ' - ' + (coins.find(row => row.id === item.coin_id)?.name) + ' - (balance:' + item.balance+')'"
                                    :value="item.hash_id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="amount">
                            <el-input v-model="transferForm.amount" placeholder="Amount" size="large" tabIndex="-1">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="description">
                            <el-input type="textarea" rows="5" v-model="transferForm.description"
                                      placeholder="Transaction Description (optional)"
                                      size="large"
                                      tabIndex="-1">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="submit-btn"
                                       @click.native.prevent="handleAddTransaction"
                                       @keyup.enter.prevent="handleAddTransaction">
                                Transfer
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<style scoped>
.title {
    text-align: center;
    font-size: 40px;
    color: black;
}

.el-main {
    width: 96%;
    height: 100%;
    background-color: #f0f2f5;
}

.el-row {
    margin-top: 50px;
}

.description {
    text-align: center;
    color: #5e5858;
}
</style>