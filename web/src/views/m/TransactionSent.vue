<script setup>
import {onMounted, ref, watch} from 'vue';
import {ElMessage, ElMessageBox} from "element-plus";
import {transactionList, transactionDelete, transactionUpdate} from "@/api/transaction";
import {useStore} from "vuex";
import moment from 'moment';

const store = useStore()

const queryInfo = ref({
    pageNo: 1,
    pageSize: 999,
    transaction_id: '',
    start_date: '',
    end_date: '',
    state: ''
});

const timeRange = ref([]);
const dataList = ref([]);
const total = ref(0);

const getDataList = () => {
    queryInfo.value.from_user_id = store.state.user.id;
    transactionList(queryInfo.value).then((res) => {
        if (res.code === 200) {
            dataList.value = res.data.list;
            total.value = res.data.total || 0;
        } else {
            ElMessage.error(res.msg);
        }
    }).catch((err) => {
        console.log(err);
    });
}

const resetDataList = () => {
    queryInfo.value = {
        pageNo: 1,
        pageSize: 999,
        transaction_id: '',
        start_date: '',
        end_date: '',
        state: ''
    };
    timeRange.value = [];
    getDataList();
}

const handleSizeChange = (newSize) => {
    queryInfo.value.pageSize = newSize;
    getDataList();
}

const handleCurrentChange = (newPage) => {
    queryInfo.value.pageNo = newPage;
    getDataList();
}

// delete record
const deleteById = async (item) => {
    const confirmResult = await ElMessageBox.confirm(
        "Confirm deletion?",
        "Tips",
        {
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
            type: "warning",
        }
    ).catch((err) => err);

    if (confirmResult === "confirm") {
        item.delete_at = 1
        transactionUpdate(item).then((res) => {
            if (res.code === 200) {
                getDataList();
                ElMessage.success("Delete success");
            } else {
                ElMessage.error("Delete failed");
            }
        }).catch((err) => {
            console.log(err);
            ElMessage.error("Network error");
        });
    }
}

watch(timeRange, () => {
    if (timeRange.value) {
        queryInfo.value.start_date = timeRange.value[0];
        queryInfo.value.end_date = timeRange.value[1];
    } else {
        queryInfo.value.start_date = '';
        queryInfo.value.end_date = '';
    }
}, {deep: true})

onMounted(() => {
    getDataList();
})
</script>


<template>
    <div class="container">
        <el-card class="card-item" v-for="item in dataList">
            <template #header>
                <div class="card-header">
                    <div class="wallet-name-avatar">
                        <div class="avatar">
                            <el-avatar :size="50" :src="item.to_avatar">
                            </el-avatar>
                        </div>
                        <div class="wallet-name-balance">
                            <div class="wallet-name">
                                Transfer to {{ item.to_username }}
                            </div>
                            <div class="balance">
                                {{ item.amount }} {{ item.from_currency_name }}
                            </div>
                        </div>
                    </div>

                    <div class="wallet-address">
                        <div class="money">
                            ${{ item.money }}
                        </div>
                        <div class="time">
                            <el-text type="info">
                                {{ moment(item.create_at).format("MM-DD HH:mm:ss") }}
                            </el-text>
                        </div>
                    </div>
                </div>
            </template>
            <p class="card-text">
                {{ item.remark }}
            </p>
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
    margin: 10px 0;
    color: black;
}

.card-item:last-child {
    margin-bottom: 100px !important;
}

.wallet-address {
    display: flex;
    justify-content: flex-end;
    /* align-items: center; */
    flex-direction: column;
    width: 110px;
    gap: 5px;
    color: red;
    text-align: right;
}

.wallet-name {
    font-size: 18px;
}

.balance {
    color: #000000;
    font-size: 14px;
}

.bottom {
    width: 100%;
    height: 100px;
}
</style>