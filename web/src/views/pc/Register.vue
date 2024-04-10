<script setup>
import {ref, reactive, onMounted} from 'vue';
import Footer from "@/views/pc/layout/Footer.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
import {userRegister} from "@/api/user.js";

const router = useRouter();

// registerForm
const registerForm = reactive({
    username: '',
    password: '',
    repeatpassword: '',
    email: '',
    phone: ''
});

// verify username
const validateUsername = (rule, value, callback) => {
    if (!value) {
        callback(new Error('Please enter your username'));
    } else {
        callback();
    }
};

// verify password
const validatePassword = (rule, value, callback) => {
    // Check if the password is at least 8 characters long
    if (value.length < 8) {
        // Prompt: "Password should be at least 8 characters long"
        callback(new Error('Password should be at least 8 characters long'));
    }

    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
        // Prompt: "Password should contain at least one uppercase letter"
        callback(new Error('Password should contain at least one uppercase letter and one lowercase letter'));
    }

    // Check if the password contains at least one lowercase letter and one special character (@ or !)
    if (!/[^\w\s]/.test(value)) {
        // Prompt: "Password should contain at least one lowercase letter and one special character (@ or !)"
        callback(new Error('Password should contain one special character (@ or !)'));
    }

    if (value !== registerForm.repeatpassword) {
        callback(new Error('The two input passwords do not match!'));
    } else {
        callback();
    }
};

// verify password
const validateRepeatPassword = (rule, value, callback) => {
    // Check if the password is at least 8 characters long
    if (value.length < 8) {
        // Prompt: "Password should be at least 8 characters long"
        callback(new Error('Password should be at least 8 characters long'));
    }

    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
        // Prompt: "Password should contain at least one uppercase letter"
        callback(new Error('Password should contain at least one uppercase letter and one lowercase letter'));
    }

    // Check if the password contains at least one lowercase letter and one special character (@ or !)
    if (!/[^\w\s]/.test(value)) {
        // Prompt: "Password should contain at least one lowercase letter and one special character (@ or !)"
        callback(new Error('Password should contain one special character (@ or !)'));
    }

    if (value !== registerForm.password) {
        callback(new Error('The two input passwords do not match!'));
    } else {
        callback();
    }
};

const validateEmail = (rule, value, callback) => {
    if (!value) {
        callback(new Error('Please enter your email'));
    } else if (value.length < 8) {
        callback(new Error('Email should be at least 8 characters long'));
    } else if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
        callback(new Error('Please enter a valid email address'));
    } else {
        callback();
    }
};

const validatePhone = (rule, value, callback) => {
    if (!value) {
        callback(new Error('Please enter your phone'));
    } else if (value.length < 8) {
        callback(new Error('Phone should be at least 8 characters long'));
    } else {
        callback();
    }
};

// registerForm ref
const registerFormRef = ref(null);

// validate form
const validateForm = (callback) => {
    registerFormRef.value.validate((valid) => {
        if (valid) {
            callback();
        } else {
            console.log('error submit!!');
        }
    });
};

// registerForm ref
const loginRules = {
    username: [
        {required: true, trigger: 'blur', validator: validateUsername}
    ],
    password: [
        {required: true, trigger: 'blur', validator: validatePassword}
    ],
    repeatpassword: [
        {required: true, trigger: 'blur', validator: validateRepeatPassword}
    ],
    email: [
        {required: true, trigger: 'blur', validator: validateEmail}
    ],
    phone: [
        {required: true, trigger: 'blur', validator: validatePhone}
    ]
};

// loading state
const loading = ref(false);

// current year
const year = new Date().getFullYear();

// login request
const handleRegister = () => {
    validateForm(() => {
        loading.value = true;
        let params = {...registerForm};
        userRegister(params).then((res) => {
            loading.value = false;
            if (res.code === 200) {
                ElMessage.success('Register successful!');
                router.push({name: "Login"});
            } else {
                ElMessage.error(res.msg);
            }
        }).catch((error) => {
            console.error(error);
            loading.value = false;
        });
    });
};

</script>


<template>
    <div v-loading.fullscreen.lock="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.6)" class="login-container" :style="bg">

        <video src="/bg/bg.mp4" class="bg-video" muted loop autoplay></video>

        <div class="left-title">
            <h1 class="main-title">CYPHERSTASH</h1>
            <h3 class="main-desc">CYPHERSTASH: Unlocking the Future of Digital Wealth</h3>
        </div>

        <div class="left-right">
            <el-form ref="registerFormRef" :model="registerForm" :rules="loginRules" class="login-form"
                     auto-complete="on"
                     label-position="left">
                <div class="title-container">
                    <h3 class="app-title">Register</h3>
                </div>

                <el-form-item prop="username">
                    <el-input v-model="registerForm.username" placeholder="Username" size="large"
                              tabIndex="-1">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <User/>
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input ref="password"
                              v-model="registerForm.password" size="large" show-password
                              placeholder="Password" name="password" tabIndex="-1" auto-complete="on"
                    >
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Lock/>
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="repeatpassword">
                    <el-input ref="repeatpassword"
                              v-model="registerForm.repeatpassword" size="large" show-password
                              placeholder="Repeat Password" name="password" tabIndex="-1" auto-complete="on"
                    >
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Lock/>
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input ref="email"
                              v-model="registerForm.email" size="large"
                              placeholder="Email" name="email" tabIndex="-1" auto-complete="on"
                    >
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <ChatDotRound/>
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input ref="phone"
                              v-model="registerForm.phone" size="large" placeholder="Phone" name="phone" tabIndex="-1"
                              auto-complete="on"
                    >
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Iphone/>
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn"
                               @click.native.prevent="handleRegister"
                               @keyup.enter.prevent="handleRegister">
                        Sign up
                    </el-button>
                </el-form-item>

                <div class="more-options">
                    <div class="more-options-left">
                        <div class="no-account-tips">Registered?</div>
                        <div>
                            <el-link :underline="false" type="primary" href="#/login">Log in</el-link>
                        </div>
                    </div>
                    <div class="more-options-right">

                    </div>
                </div>
            </el-form>
        </div>

    </div>

    <Footer class="footer"></Footer>
</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: space-around;
    align-self: center;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
}

.bg-video {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
}

.left-title {
    margin-left: 100px;
    z-index: 99;
    color: white;
}

.main-title {
    font-size: 78px;
}

.main-desc {
    font-size: 32px;
}

.left-right {
    margin-right: 100px;
}

.title-container {
    margin: 30px auto;
}

.login-form {
    width: 500px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    z-index: 99;
    opacity: 0.85;
}

.app-title {
    text-align: center;
}

.login-btn {
    width: 100%;
    margin-bottom: 20px;
}

.footer {
    width: 100%;
    height: 20px;
    text-align: center;
    font-size: 14px;
    color: #000000;
    position: fixed;
    bottom: 30px;
}

.footer-company {
    color: white;
    width: 380px;
    margin: 0 auto;
}

.footer-company a {
    color: white;
}

.more-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.more-options-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    width: 50%;
}

.no-account-tips {
    font-size: 14px;
}

.footer {
    position: fixed;
    bottom: 10px;
    z-index: 99;
    color: white;
    font-size: 16px;
}
</style>