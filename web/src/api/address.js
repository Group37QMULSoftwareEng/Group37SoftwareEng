import request from '@/utils/request'

export function walletAddressAdd(data) {
    return request({
        url: '/wallet/address',
        method: 'post',
        data
    })
}


export function walletAddressDelete(id) {
    return request({
        url: '/wallet/address',
        method: 'delete',
        params: {
            id: id
        }
    })
}

export function walletAddressUpdate(data) {
    return request({
        url: '/wallet/address',
        method: 'put',
        data
    })
}

export function walletAddressList(params) {
    return request({
        url: '/wallet/address',
        method: 'get',
        params
    })
}