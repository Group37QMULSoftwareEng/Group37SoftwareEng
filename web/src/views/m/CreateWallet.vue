<script setup>
import {onMounted, ref} from 'vue';
import {showNotify, showToast} from "vant";
import {useStore} from "vuex";
import {useRoute, useRouter} from 'vue-router';
import {walletAdd} from "@/api/wallet";
import {coinList} from "@/api/coin.js";

const store = useStore()
const router = useRouter();
const coins = ref([]);

const show = ref(false);
const walletForm = ref({});

// get all currency
const getCoinList = async () => {
    const res = await coinList();
    if (res.code === 200) {
        res.data.map(item => {
            item.subname = item.rate + '(USD)'
        })
        coins.value = res.data
    } else {
        showNotify({type: 'danger', message: 'Get coin list failed, please try again!'});
    }
}

// handleBack
const handleBack = () => {
    router.go(-1)
}

// handle Select
const onSelect = (coin) => {
    walletForm.value.coin_id = coin.id
    walletForm.value.coin_name = coin.name;
    show.value = false
}

const onCancel = () => showToast('cancel');

// handleAddWallet
const handleAddWallet = async () => {
    if (!walletForm.value.name) {
        showNotify({type: 'danger', message: 'Please enter wallet name'});
        return;
    }
    if (!walletForm.value.coin_id) {
        showNotify({type: 'danger', message: 'Please choose a currency'});
        return;
    }
    if (!walletForm.value.description) {
        showNotify({type: 'danger', message: 'Please enter wallet description'});
        return;
    }
    let params = {
        "user_id": store.state.user.id,
        "name": walletForm.value.name,
        "coin_id": walletForm.value.coin_id,
        "description": walletForm.value.description
    }
    const res = await walletAdd(params);
    if (res.code === 200) {
        showNotify({type: 'success', message: 'Create wallet success!'});
    } else {
        showNotify({type: 'danger', message: res.msg});
    }
}

onMounted(() => {
    getCoinList()
})
</script>

<template>
    <div class="container">
        <div class="menu">
            <van-cell-group>
                <van-field v-model="walletForm.name" label="Name" placeholder="Enter wallet name"/>
                <van-field v-model="walletForm.coin_name" label="Currency" @click="show = true"
                           placeholder="Choose a currency"/>
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
                <van-button round block type="primary" native-type="submit" @click="handleAddWallet">
                    Submit
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

    <van-action-sheet
        v-model:show="show"
        :actions="coins"
        cancel-text="cancel"
        close-on-click-action
        @select="onSelect"
        @cancel="onCancel"
    />
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