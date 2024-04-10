import axios from 'axios'
import router from '../router'
import {ElMessage} from 'element-plus'

// axios instance
const service = axios.create({
    baseURL: '/api',
    timeout: 60000,
    withCredentials: true,
    headers: {
        // 'token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

service.interceptors.request.use(
    function (config) {
        return config
    },
    function (error) {
        // console.log(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    function (response) {
        // console.log(response)
        const res = response.data

        if (res.code === 401) {
            ElMessage.error("Not logged in")
            router.push({name: 'Login'})
        } else {
            return response.data
        }
    },
    function (error) {
        console.log(error)
        return Promise.reject(error)
    }
)
export default service