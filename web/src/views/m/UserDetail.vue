<script setup>
import {onMounted, reactive, ref} from 'vue';
import {useStore} from 'vuex'
import {showNotify} from "vant";
import {upload} from "@/api/upload.js";
import {userUpdate} from "@/api/user";


const editForm = reactive({})

const store = useStore();

const urls = ref([]);

const editUser = () => {
    if (editForm.password === "") {
        showNotify({
            type: 'warning',
            message: 'Password cannot be empty',
        });
        return;
    }
    let params = JSON.parse(JSON.stringify(editForm));
    userUpdate(params).then((res) => {
        if (res.code === 200) {
            store.commit("SET_USERINFO", editForm);
            showNotify({
                type: 'success',
                message: 'Update successfully',
            })
        } else {
            showNotify({
                type: 'danger',
                message: 'Update failed',
            });
        }
    }).catch((err) => {
        showNotify({
            type: 'danger',
            message: 'Update failed',
        })
    });
}

const handleUpload = (file, callback) => {
    const formData = new FormData()
    formData.append('file', file.file)

    upload(formData).then((res) => {
        if (res.code === 200) {
            showNotify({
                type: 'success',
                message: 'Upload successfully',
            })
            callback && callback(res);
        } else {
            showNotify({
                type: 'danger',
                message: 'Upload failed',
            })
        }
    }).catch((err) => {
        showNotify({
            type: 'danger',
            message: 'Netword error',
        })
    });
}

const handleAddUserAvatar = (file) => {
    handleUpload(file, (res) => {
        editForm.avatar = res.data
        urls.value = [{url: editForm.avatar}]
    })
}

onMounted(() => {
    editForm.username = store.state.user.username
    editForm.password = store.state.user.password
    editForm.email = store.state.user.email
    editForm.phone = store.state.user.phone
    editForm.id = store.state.user.id
    editForm.role = store.state.user.role
    editForm.avatar = store.state.user.avatar
    urls.value = [{url: editForm.avatar}]
    console.log(editForm)
});
</script>

<template>
    <el-container class="table-container">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="editForm.username" label="Username" placeholder="Username"></van-field>

                <van-field name="uploader" label="Avatar">
                    <template #input>
                        <van-uploader v-model="urls" :after-read="handleAddUserAvatar"/>
                    </template>
                </van-field>

                <van-field type="password" v-model="editForm.password" label="Password"
                           placeholder="Password"></van-field>

                <van-field v-model="editForm.email" label="Email" placeholder="Email"></van-field>

                <van-field v-model="editForm.phone" label="Phone" placeholder="Phone"></van-field>
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit" @click="editUser">
                    Submit
                </van-button>
            </div>
        </van-form>
    </el-container>
</template>

<style scoped>
.table-container {
    margin: 20px 0;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
}
</style>
