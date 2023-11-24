import axios from "axios";

const service = axios.create({
    baseURL: 'http://localhost:4444',
    headers: {
        "Content-Type": "application/json"
    }
})

const request = (req) => service({
    url: req.url,
    data: req.data,
    method: req.method,
    headers: req.headers
})

export default request;