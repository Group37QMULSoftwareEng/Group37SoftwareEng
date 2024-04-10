import request from '@/utils/request'

export function logList(params) {
    return request({
        url: '/logs',
        method: 'get',
        params
    })
}