import request from '@/utils/request'

// get analy data
export function analyLineList(data) {
    return request({
        url: '/analy/user', method: 'get', params: data
    })
}

// get analy data 2
export function analyBarList(data) {
    return request({
        url: '/analy/transaction', method: 'get', params: data
    })
}