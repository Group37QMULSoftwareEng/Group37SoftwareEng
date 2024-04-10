<script setup>
import {onMounted, ref, watch} from 'vue';
import {ElMessage, ElMessageBox} from "element-plus";
import {transactionList, transactionDelete, transactionUpdate} from "@/api/transaction";
import {useStore} from "vuex";

const store = useStore()

const queryInfo = ref({
    pageNo: 1,
    pageSize: 10,
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
        pageSize: 10,
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
        transactionUpdate({id: item.id, delete_at: 1}).then((res) => {
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
    <el-container class="el-container-fix">
        <el-header>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input
                        placeholder="Enter transaction ID"
                        v-model="queryInfo.transaction_id"
                        clearable
                        @clear="getDataList"
                        @keydown.enter="getDataList"
                    >
                        <template #prepend>Transation ID</template>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="queryInfo.state" placeholder="State">
                        <el-option :value="0" label="Uncompleted"></el-option>
                        <el-option :value="1" label="Completed"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6.5">
                    <el-date-picker
                        v-model="timeRange"
                        type="datetimerange"
                        range-separator="To"
                        date-format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        start-placeholder="Start date"
                        end-placeholder="End date"
                    />
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="getDataList">
                        Search
                    </el-button>
                    <el-button type="info" @click="resetDataList">
                        Reset
                    </el-button>
                </el-col>
            </el-row>
        </el-header>

        <el-main>
            <el-table
                :data="dataList"
                height="650"
                ref="filterTable"
                :border="true"
                stripe
                :fit="true"
            >
                <el-table-column prop="id" label="ID" width="80"></el-table-column>
                <el-table-column prop="transaction_id" label="Transaction ID"></el-table-column>
                <el-table-column prop="from_wallet_id" label="From"></el-table-column>
                <el-table-column prop="to_wallet_id" label="To"></el-table-column>
                <el-table-column prop="from_currency_name" width="200" label="From Currency">
                    <template #default="scope">
                        <el-tag>{{ scope.row.from_currency_name }}</el-tag>
                        / {{ scope.row.from_currency_rate }} USD
                    </template>
                </el-table-column>
                <el-table-column prop="to_currency_name" width="200" label="To Currency">
                    <template #default="scope">
                        <el-tag>{{ scope.row.to_currency_name }}</el-tag>
                        / {{ scope.row.to_currency_rate }} USD
                    </template>
                </el-table-column>
                <el-table-column prop="amount" label="Amount"></el-table-column>
                <el-table-column prop="money" label="toUSD"></el-table-column>
                <el-table-column prop="state" label="State" width="100">
                    <template #default="scope">
                        <el-tag
                            :type="scope.row.state === 1 ? 'success' : 'danger'"
                            disable-transitions
                        >
                            {{ scope.row.state === 1 ? "Completed" : "Uncompleted" }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="create_at" label="Transaction Time"></el-table-column>
                <el-table-column label="Action" width="120">
                    <template #default="scope">
                        <el-button
                            size="small"
                            type="danger"
                            icon="Delete"
                            @click="deleteById(scope.row)"
                        >Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <el-row>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.page"
                :page-sizes="[10, 20,50, 100]"
                :page-size="queryInfo.limit"
                :total="total"
                layout="total,prev, pager, next,jumper"
            >
            </el-pagination>
        </el-row>
    </el-container>
</template>

<style scoped>
.el-container-fix {
    width: 98%;
    margin: auto;
    padding: 20px 0;
}

.row-image {
    width: 50%;
    height: 100px;
}
</style>