import request from '@/utils/request'

// get coin list api
export function coinList(data) {
    return request({
        url: '/coin/list',
        method: 'get',
        params: data
    })
}

// get coin rate api
export function coinRateList(data) {
    return request({
        url: '/coin/rate',
        method: 'get',
        params: data
    })
}

// get coin rate api
export function coinRateRank(data) {
    return request({
        url: '/coin/rate/list',
        method: 'get',
        params: data
    })
}