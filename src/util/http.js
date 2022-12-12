import axios from "axios";
import { Toast } from "vant";
const http = axios.create({
        baseURL: 'https://m.maizuo.com',
        timeout: 10000,
        headers: {
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16664527034210639908110337","bc":"440100"}',
        }
    })
    // 请求之前拦截
    // Add a request interceptor
http.interceptors.request.use(function(config) {
    // Do something before request is sent
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
    });
    return config;
}, function(error) {
    return Promise.reject(error);
});

// 请求完成拦截
// Add a response interceptor
http.interceptors.response.use(function(response) {

    Toast.clear()
    return response;
}, function(error) {

    Toast.clear()
    return Promise.reject(error);
});
export default http
// function httpForNowplaying() {
//     return axios({
//         url: 'https://m.maizuo.com/gateway?cityId=440100&pageNum=1&pageSize=10&type=1&k=4468414',
//         headers: {
//             'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16664527034210639908110337","bc":"440100"}',
//             'X-Host': 'mall.film-ticket.film.list'
//         }
//     })
// }

// function httpForComingsoon() {
//     return axios({
//         url: 'https://m.maizuo.com/gateway?cityId=440100&pageNum=1&pageSize=10&type=2&k=5054461',
//         headers: {
//             'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16664527034210639908110337","bc":"440100"}',
//             'X-Host': 'mall.film-ticket.film.list'
//         }
//     })
// }

// function httpForDetail(filmId) {
//     return axios({
//         url: 'https://m.maizuo.com/gateway?filmId=' + filmId + '&k=7726072',
//         // url:`https://m.maizuo.com/gateway?filmId=${this.filmId}&k=7726072`,
//         headers: {
//             'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16664527034210639908110337","bc":"440100"}',
//             'X-Host': 'mall.film-ticket.film.info'
//         }
//     })
// }
// export default {
//     httpForNowplaying,
//     httpForComingsoon,
//     httpForDetail
// }