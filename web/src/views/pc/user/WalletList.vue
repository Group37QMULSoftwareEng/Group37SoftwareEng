<script setup>
import {ref, onMounted} from 'vue';
import {useStore} from "vuex";
import {walletDelete, walletList, walletUpdate} from "@/api/wallet";
import {ElMessage, ElMessageBox} from "element-plus";
import {coinList} from "@/api/coin.js";
import {useRouter} from 'vue-router';

const store = useStore()
const router = useRouter();

const coins = ref([]);
const query = ref({});
const total = ref(0);
const dataList = ref([]);

const chargeVisiable = ref(false);
const chargeValue = ref(0);
const chargeForm = ref({});

const editDialogVisible = ref(false);
const editForm = ref({});

// get all currency
const getCoinList = async () => {
    const res = await coinList();
    if (res.code === 200) {
        // console.log(res.data)
        coins.value = res.data
        getDataList()
    } else {
        ElMessage.error('Get coin list failed, please try again!');
    }
}

// get user wallet
const getDataList = async () => {
    query.value.user_id = store.state.user.id
    const res = await walletList(query.value);
    if (res.code === 200) {
        dataList.value = res.data.list
        total.value = res.data.total
    } else {
        ElMessage.error('Get user wallet list failed, please try again!');
    }
}

const handleChangePage = (newPage) => {
    query.value.pageNo = newPage;
    getDataList()
}

const handleChangeSize = (newSize) => {
    query.value.pageSize = newSize;
    getDataList()
}

// dialog
const showChargeBox = (value) => {
    chargeForm.value = value
    chargeVisiable.value = true
}

// delete wallet
const deleteById = async (id) => {
    const confirmResult = await ElMessageBox.confirm(
        "Confrim to delete?",
        "Tips",
        {
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
            type: "warning",
        }
    ).catch((err) => err);

    if (confirmResult === "confirm") {
        const res = await walletDelete(id)
        if (res.code === 200) {
            getDataList();
            ElMessage.success("Delete success");
        } else {
            ElMessage.error("Delete failed, please try again!");
        }
    }
}

const handleCharge = async () => {
    chargeVisiable.value = false
    chargeForm.value.balance = parseFloat(chargeValue.value) + parseFloat(chargeForm.value.balance)
    const res = await walletUpdate(chargeForm.value)
    if (res.code === 200) {
        chargeValue.value = 0
        ElMessage.success("Purchase success")
    } else {
        ElMessage.error("Purchase failed, please try again!")
    }
}

const showEditBox = (data) => {
    editForm.value = data
    editDialogVisible.value = true
}

// edit
const editWallet = () => {
    walletUpdate(editForm.value).then((res) => {
        if (res.code === 200) {
            editDialogVisible.value = false
            ElMessage.success("Update success");
        } else {
            ElMessage.error("Update failed");
        }
    })
}

onMounted(() => {
    getCoinList()
    getDataList()
})
</script>

<template>
    <el-container>
        <el-main>
            <el-header>
                <h1 class="title">Wallet List</h1>
            </el-header>

            <el-row type="flex" justify="center" v-if="dataList.length===0" style="margin-top: 100px">
                <el-button type="primary" @click="router.push({name: 'CreateWallet'})">Create Wallet</el-button>
            </el-row>

            <el-row type="flex" justify="center" v-if="dataList && dataList.length>0">
                <el-col :span="20">
                    <el-table
                        :data="dataList"
                        height="650"
                        stripe
                        ref="walletTable"
                    >
                        <el-table-column prop="hash_id" label="HashId"></el-table-column>
                        <el-table-column prop="name" label="Name">
                            <template #default="scope">
                                <el-text type="warning">{{ scope.row.name }}</el-text>
                            </template>
                        </el-table-column>
                        <el-table-column prop="balance" label="Balance"></el-table-column>
                        <el-table-column prop="currency" label="Currency">
                            <template #default="scope">
                                <el-text type="primary">{{ coins.find(item => item.id === scope.row.coin_id)?.name }}
                                </el-text>
                            </template>
                        </el-table-column>
                        <el-table-column prop="state" label="State">
                            <template #default="scope">
                                <el-text :type="scope.row.state === 1 ? 'success' : 'danger'">
                                    {{ scope.row.state === 1 ? 'Normal' : 'Locked' }}
                                </el-text>
                            </template>
                        </el-table-column>
                        <el-table-column prop="description" label="Description"></el-table-column>
                        <el-table-column prop="create_at" label="CreateTime">
                            <template #default="scope">
                                <el-text type="info">{{ scope.row.create_at }}</el-text>
                            </template>
                        </el-table-column>
                        <el-table-column label="Action" width="300">
                            <template #default="scope">
                                <el-button type="primary" size="small" icon="Edit" @click="showEditBox(scope.row)">
                                    Edit
                                </el-button>
                                <el-button
                                    type="warning"
                                    size="small"
                                    icon="Coin"
                                    @click="showChargeBox(scope.row)"
                                >ReCharge
                                </el-button>
                                <el-button
                                    size="small"
                                    type="danger"
                                    icon="Delete"
                                    @click="deleteById(scope.row.id)"
                                >Delete
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-row class="el-row-top">
                        <el-pagination
                            @size-change="handleChangeSize"
                            @current-change="handleChangePage"
                            :current-page="query.pageNo"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="query.pageSize"
                            :total="total"
                            layout="total,prev,pager,next,jumper"
                        >
                        </el-pagination>
                    </el-row>
                </el-col>
            </el-row>
        </el-main>
    </el-container>


    <el-dialog title="Purchase" v-model="chargeVisiable" width="25%">
        <el-form :model="chargeForm" label-width="70px" ref="chargeFormRef">
            <el-form-item label="Amount" prop="balance">
                <el-input v-model="chargeValue" placeholder="Purchase amount"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="handleCharge">Confirm</el-button>
            <el-button @click="chargeVisiable = false">Cancel</el-button>
        </template>
    </el-dialog>

    <el-dialog title="Edit Wallet" v-model="editDialogVisible" width="30%">
        <el-form ref="editFormRef" :model="editForm" class="login-form"
                 auto-complete="on"
                 label-position="left">
            <el-form-item prop="name">
                <el-input v-model="editForm.name" placeholder="Wallet Name" size="large"
                          tabIndex="-1">
                </el-input>
            </el-form-item>
            <!--            <el-form-item prop="name">-->
            <!--                <el-select v-model="editForm.coin_id" placeholder="Select Currency" filterable-->
            <!--                           clearable>-->
            <!--                    <el-option-->
            <!--                        v-for="item in coins"-->
            <!--                        :key="item.id"-->
            <!--                        :label="item.name + ' - ' + item.rate + '(USD)'"-->
            <!--                        :value="item.id"-->
            <!--                    />-->
            <!--                </el-select>-->
            <!--            </el-form-item>-->
            <el-form-item prop="description">
                <el-input type="textarea" rows="5" v-model="editForm.description"
                          placeholder="Wallet Description"
                          size="large"
                          tabIndex="-1">
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editWallet">Confirm</el-button>
        </span>
    </el-dialog>
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

.el-row-top {
    margin-top: 20px;
}
</style>