import request from './request';

const urls = {
    getLoginDetails: '/login'
}
const obj = {}

obj.getLoginDetails = async (req) => {

    let data = await request({
        url: urls.getLoginDetails,
        data: null,
        method: 'get'
    })
    return data
}

export default obj;