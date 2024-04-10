import request from '@/utils/request'

export function transactionAdd(data) {
    return request({
        url: '/transaction',
        method: 'post',
        data
    })
}


export function transactionDelete(id) {
    return request({
        url: '/transaction',
        method: 'delete',
        params: {
            id: id
        }
    })
}

export function transactionUpdate(data) {
    return request({
        url: '/transaction',
        method: 'put',
        data
    })
}

export function transactionList(params) {
    return request({
        url: '/transaction',
        method: 'get',
        params
    })
}

export function transactionTransfer(data) {
    return request({
        url: '/transaction/transfer',
        method: 'post',
        data
    })
}