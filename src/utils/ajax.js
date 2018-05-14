/*
 * @Author: wzc0x0@gmail.com
 * @Date: 2017-11-04 22:44:52
 * @Feature: Package ajax function by flyio & add global loading style when ajax
 * Release global variable in webpack.base.conf.js when compile
 */

import fly from 'flyio'
import qs from 'qs'
// by chd
import { Loading , Message } from 'element-ui'
let loadingInstance;
// end

const jsonParse = data => Object.prototype.toString.call(data).toLowerCase() === "[object object]" ? data : JSON.parse(data)

fly.config.timeout = "5000";
fly.config.baseURL = BASEURL;

fly.interceptors.request.use((conf, promise) => {
    // by chd
    loadingInstance = Loading.service({ fullscreen: true, background: "rgba(0, 0, 0, 0.8)", text: "Loading..." });
    // end
    return conf
}, err => Promise.reject(err))

fly.interceptors.response.use(
    (res, promise) => {
        // by chd
        loadingInstance.close();
        // end
        return jsonParse(res.data).code == '200' ? jsonParse(res.data) : Promise.reject(jsonParse(res.data))
    },
    (err, promise) => {
        // by chd
        loadingInstance.close();
        Message.error({
            message:"请求超时",
            center:true
        });
        // end
        console.log(err);
        return Promise.reject(err)
    }
);

export const _post = (url, data, options) => fly.post(url, qs.stringify(data), options)
export default fly