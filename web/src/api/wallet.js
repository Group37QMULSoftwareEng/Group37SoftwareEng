import request from '@/utils/request'

export function walletAdd(data) {
    return request({
        url: '/wallet',
        method: 'post',
        data
    })
}


export function walletDelete(id) {
    return request({
        url: '/wallet',
        method: 'delete',
        params: {
            id: id
        }
    })
}

export function walletUpdate(data) {
    return request({
        url: '/wallet',
        method: 'put',
        data
    })
}

export function walletList(params) {
    return request({
        url: '/wallet',
        method: 'get',
        params
    })
}

export function walletTransfer(data) {
    return request({
        url: '/wallet/transfer',
        method: 'post',
        data
    })
}