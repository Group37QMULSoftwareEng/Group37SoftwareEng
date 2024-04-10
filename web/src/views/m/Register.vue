<script>
import {userRegister} from "@/api/user";
import {showNotify} from 'vant';

export default {
    name: 'Login',
    setup() {
        const validatePassword = (value) => {
            // Check if the password is at least 8 characters long
            if (value.length < 8) {
                // Prompt: "Password should be at least 8 characters long"
                return 'Password should be at least 8 characters long'
            }

            // Check if the password contains at least one uppercase letter
            if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
                // Prompt: "Password should contain at least one uppercase letter"
                return 'Password should contain at least one uppercase letter and one lowercase letter'
            }

            // Check if the password contains at least one lowercase letter and one special character (@ or !)
            if (!/[^\w\s]/.test(value)) {
                // Prompt: "Password should contain at least one lowercase letter and one special character (@ or !)"
                return 'Password should contain one special character (@ or !)'
            }
        }

        const validateEmail = (value) => {
            if (!value) {
                return 'Please enter your email'
            } else if (value.length < 8) {
                return 'Email should be at least 8 characters long'
            } else if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
                return 'Please enter a valid email address'
            }
        }

        const validatePhone = (value) => {
            if (!value) {
                return 'Please enter your phone'
            } else if (value.length < 8) {
                return 'Phone should be at least 8 characters long'
            }
        }


        return {
            validatePassword,
            validateEmail,
            validatePhone
        }
    },
    data() {
        return {
            // login form
            loading: false,
            registerForm: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        // login request
        handleRegister() {
            this.loading = true
            if (this.registerForm.password !== this.registerForm.repeatpassword) {
                this.loading = false
                showNotify({type: 'danger', message: 'The password entered twice is inconsistent!'});
                return
            }
            if (this.registerForm.password.length < 8) {
                this.loading = false
                showNotify({type: 'danger', message: 'The password can not be less than 8 digits!'});
                return
            }
            if (!/[A-Z]/.test(this.registerForm.password) || !/[a-z]/.test(this.registerForm.password)) {
                this.loading = false
                showNotify({
                    type: 'danger',
                    message: 'The password must contain at least one uppercase letter and one lowercase letter!'
                });
                return
            }
            if (!/[^\w\s]/.test(this.registerForm.password)) {
                this.loading = false
                showNotify({
                    type: 'danger',
                    message: 'The password must contain at least one lowercase letter and one special character (@ or !)!'
                });
                return
            }
            userRegister(this.registerForm).then((res) => {
                console.log(res)
                this.loading = false
                if (res.code === 200) {
                    showNotify({type: 'success', message: 'Register successful!'});
                } else {
                    showNotify({type: 'danger', message: res.msg});
                }
            }).catch((result) => {
            })
        }
    }
}
</script>

<template>
    <video src="/bg/bg.mp4" class="bg-video" muted loop autoplay></video>

    <div v-loading="loading" element-loading-text="loading..." element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.6)" class="login-container">
        <van-form @submit="handleRegister" class="m-login-form">
            <div class="title-container">
                <img class="logo-img" src="/logo/logo.png">
                <h5>Unlocking the Future of Digital Wealth</h5>
            </div>

            <div class="title-container">
                <h3 class="title">Sign up</h3>
            </div>

            <van-cell-group inset>
                <van-field
                    v-model="registerForm.username"
                    label="Username"
                    size="large"
                    placeholder="Username"
                    autocomplete="false"
                    :rules="[{ required: true, message: 'Please input username' }]"
                />
                <van-field
                    v-model="registerForm.password"
                    type="password"
                    label="Password"
                    size="large"
                    placeholder="Password"
                    autocomplete="false"
                    :rules="[{ required: true,validator: validatePassword, message: 'Please input password' }]"
                />
                <van-field
                    v-model="registerForm.repeatpassword"
                    type="password"
                    label="Repeat"
                    size="large"
                    placeholder="Repeat Password"
                    autocomplete="false"
                    :rules="[{ required: true, validator: validatePassword, message: 'Please Repeat Password' }]"
                />
                <van-field
                    v-model="registerForm.email"
                    type="email"
                    label="Email"
                    size="large"
                    placeholder="Email"
                    autocomplete="false"
                    :rules="[{ required: true,validator:validateEmail, message: 'Please input email' }]"
                />
                <van-field
                    v-model="registerForm.phone"
                    type="tel"
                    label="Phone"
                    size="large"
                    placeholder="Phone"
                    autocomplete="false"
                    :rules="[{ required: true,validator:validatePhone, message: 'Please input phone' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    Register
                </van-button>
            </div>
            <div class="register">
                <router-link to="/login">Log in</router-link>
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