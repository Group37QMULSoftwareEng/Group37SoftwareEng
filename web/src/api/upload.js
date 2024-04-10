import request from '@/utils/request'

//upload file
export function upload(data) {
    return request({
        url: '/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}