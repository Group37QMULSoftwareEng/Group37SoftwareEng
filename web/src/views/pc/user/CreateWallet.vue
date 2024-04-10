<script setup>
import {ref, reactive, onMounted} from 'vue';
import {useStore} from "vuex";
import {walletAdd} from "@/api/wallet";
import {ElMessage} from "element-plus";
import {coinList} from "@/api/coin.js";

const store = useStore()

const coins = ref([]);
const createWalletForm = reactive({});

// get all currency
const getCoinList = async () => {
    let res = await coinList();
    if (res.code === 200) {
        coins.value = res.data
    } else {
        ElMessage.error('Get coin list failed, please try again!');
    }
}

// add wallet
const handleAddWallet = async () => {
    createWalletForm.user_id = store.state.user.id
    let res = await walletAdd(createWalletForm);

    if (res.code === 200) {
        // clear form
        createWalletForm.name = '';
        createWalletForm.coin_id = '';
        createWalletForm.description = '';
        ElMessage.success('Create wallet successful!');
    } else {
        ElMessage.error('Create wallet failed, please try again!');
    }
}

onMounted(() => {
    getCoinList()
})
</script>

<template>
    <el-container>
        <el-main>
            <el-header>
                <h1 class="title">Create Wallet</h1>
            </el-header>

            <el-row type="flex" justify="center">
                <el-col :span="8">
                    <el-form ref="createWalletFormRef" :model="createWalletForm" class="login-form"
                             auto-complete="on"
                             label-position="left">
                        <el-form-item prop="name">
                            <el-input v-model="createWalletForm.name" placeholder="Wallet Name" size="large"
                                      tabIndex="-1">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="name">
                            <el-select v-model="createWalletForm.coin_id" placeholder="Select Currency" filterable
                                       clearable>
                                <el-option
                                    v-for="item in coins"
                                    :key="item.id"
                                    :label="item.name + ' - ' + item.rate + '(USD)'"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="description">
                            <el-input type="textarea" rows="5" v-model="createWalletForm.description"
                                      placeholder="Wallet Description"
                                      size="large"
                                      tabIndex="-1">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="submit-btn"
                                       @click.native.prevent="handleAddWallet"
                                       @keyup.enter.prevent="handleAddWallet">
                                Submit
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

.el-row{
    margin-top:50px;
}

</style>