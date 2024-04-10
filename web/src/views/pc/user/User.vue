<script setup>
import {onMounted, reactive, ref} from 'vue';
import {useStore} from 'vuex'
import {ElMessage} from "element-plus";
import {upload} from "@/api/upload.js";
import {userUpdate} from "@/api/user";


const editForm = reactive({})

const store = useStore();

const editUser = () => {
    if (editForm.password === "") {
        ElMessage.warning("Password cannot be empty");
        return;
    }
    let params = JSON.parse(JSON.stringify(editForm));
    userUpdate(params).then((res) => {
        if (res.code === 200) {
            store.commit("SET_USERINFO", editForm);
            ElMessage.success("Update successfully");
        } else {
            ElMessage.error(res.msg);
        }
    }).catch((err) => {
        console.log(err);
        ElMessage.error("Update failed");
    });
}

const handleUpload = (file, callback) => {
    const formData = new FormData()
    formData.append('file', file.file)

    upload(formData).then((res) => {
        if (res.code === 200) {
            ElMessage.success("Upload success");
            callback && callback(res);
        } else {
            ElMessage.error("Upload failed");
        }
    }).catch((err) => {
        ElMessage.error("Network error");
    });
}

const handleAddUserAvatar = (file) => {
    handleUpload(file, (res) => {
        editForm.avatar = res.data
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
    console.log(editForm)
});
</script>

<template>
    <el-container class="table-container">
        <el-row>
            <el-form :model="editForm" label-width="140px">
                <el-form-item label="Username" prop="username">
                    <el-input v-model="editForm.username" placeholder="Username"></el-input>
                </el-form-item>
                <el-form-item label="Avatar" prop="cover">
                    <el-upload
                        class="upload-demo"
                        drag
                        style="margin-top:10px;"
                        :http-request="handleAddUserAvatar"
                    >
                        <el-icon v-if="!editForm.avatar" class="el-icon--upload">
                            <upload-filled/>
                        </el-icon>

                        <el-image v-if="editForm.avatar" style="width: 20%; height: auto" :src="editForm.avatar"
                                  fit="contain"/>
                        <div class="el-upload__text">
                            Drag and drop the file here <em> or click Upload </em>
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input type="password" v-model="editForm.password" show-password
                              placeholder="Password"></el-input>
                </el-form-item>
                <!--                <el-form-item label="Repeat" prop="repeat">-->
                <!--                    <el-input type="password" v-model="editForm.repeatpassword"-->
                <!--                              placeholder="Repeat Password" show-password></el-input>-->
                <!--                </el-form-item>-->
                <el-form-item label="Email" prop="email">
                    <el-input v-model="editForm.email" placeholder="Email"></el-input>
                </el-form-item>
                <el-form-item label="Phone" prop="phone">
                    <el-input v-model="editForm.phone" placeholder="Phone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editUser()">Submit</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </el-container>
</template>

<style scoped>
.table-container {
    margin: 20px 20px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
}
</style>
