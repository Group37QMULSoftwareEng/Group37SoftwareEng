<script>
import {userLogin} from "@/api/user";
import {showNotify} from 'vant';


export default {
    name: 'Login',
    data() {
        return {
            // login form
            loading: false,
            loginForm: {
                username: '',
                password: ''
            }
        }
    },
    setup() {
    },
    methods: {
        // login request
        handleLogin() {
            this.loading = true
            userLogin(this.loginForm).then((res) => {
                console.log(res)
                this.loading = false
                if (res.code === 200) {
                    if (res.data.role !== 1) {
                        showNotify({type: 'danger', message: 'Only users can log in to the mobile terminal!'});
                        return
                    }
                    //save userinfo
                    this.$store.commit('SET_USERINFO', res.data)
                    showNotify({type: 'success', message: 'Login successful!'});
                    setTimeout(() => {
                        this.$router.push({name: 'Home'})
                    }, 1500)
                } else {
                    showNotify({type: 'danger', message: res.msg});
                }
            }).catch((result) => {
                console.log(result)
            })
        }
    }
}
</script>

<template>
    <video src="/bg/bg.mp4" class="bg-video" muted loop autoplay></video>

    <div v-loading="loading" element-loading-text="loading..." element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.6)" class="login-container">
        <van-form @submit="handleLogin" class="m-login-form">
            <div class="title-container">
                <img class="logo-img" src="/logo/logo.png">
                <h5>Unlocking the Future of Digital Wealth</h5>
            </div>

            <div class="title-container">
                <h3 class="title">Log in</h3>
            </div>

            <van-cell-group inset>
                <van-field
                    v-model="loginForm.username"
                    label="Account"
                    size="large"
                    placeholder="Email / Username"
                    autocomplete="false"
                    :rules="[{ required: true, message: 'Please input email or username' }]"
                />
                <van-field
                    v-model="loginForm.password"
                    type="password"
                    label="Password"
                    size="large"
                    placeholder="Password"
                    autocomplete="false"
                    :rules="[{ required: true, message: 'Please input password' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    Login
                </van-button>
            </div>
            <div class="register">
                <router-link to="/register">Not a user</router-link>
            </div>
        </van-form>
    </div>

    <van-loading v-if="loading" type="spinner"/>
</template>

<style scoped>
.logo-img {
    width: 300px;
    height: 100px;
    margin: 0 auto;
}

.bg-video {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
}

.login-container {
    display: flex;
    justify-content: center;
    align-self: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    //background: #005aff linear-gradient(to right, rgba(0, 255, 0, 0), rgb(0 255 173 / 50%));
}

.title-container {
    margin: 30px auto;
    text-align: center;
    color: white;
}

.m-login-form {
    width: 90%;
    margin: 0 auto;
    padding: 20px 0 30px 0;
    border-radius: 5px;
    background-color: #373737a8;
    z-index: 99;
}

.register {
    width: 100%;
    margin: auto;
    font-size: 14px;
    color: white;
    text-align: center;
}

.register > a {
    color: white;
}
</style>