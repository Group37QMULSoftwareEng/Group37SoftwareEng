import request from '@/utils/request'

export function userLogin(data) {
    return request({
        url: '/login',
        method: 'post',
        data: data,
    })
}

export function userRegister(data) {
    return request({
        url: '/register',
        method: 'post',
        data: data,
    })
}

export function userDelete(ids) {
    return request({
        url: '/user',
        method: 'delete',
        params: {
            id: ids
        }
    })
}

export function userAdd(data) {
    return request({
        url: '/user',
        method: 'post',
        data
    })
}

export function userUpdate(data, isBlock = false) {
    return request({
        url: '/user?isChangeBlock=' + isBlock,
        method: 'put',
        data
    })
}

export function userList(params) {
    return request({
        url: '/user',
        method: 'get',
        params
    })
}