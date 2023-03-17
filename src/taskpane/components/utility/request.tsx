import axios, { AxiosRequestConfig } from "axios";
import qs = require('qs');
import { api } from "./config";

/* global process, console */
axios.defaults.baseURL = api.baseUrl;
axios.defaults.timeout = 6000;
export const get = (url: string, config: AxiosRequestConfig = {}): Promise<any> =>
    new Promise((resolve) => {
        axios
            .get(url, {
                params: config.params,
                paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
            })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                console.log(error);
            });
    });

// post request
export const post = (url: string, data = {}, config: AxiosRequestConfig = {}): Promise<any> =>
    new Promise((resolve) => {
        axios
            .post(url, data, config)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                console.error(error);
            });
    });

const request = axios.create({
    baseURL: api.baseUrl,
    timeout: 6000,
});

const errorHandler = (error: { response: { data: any; status: number; }; }) => {
    console.log("@@@@@", error);
    if (error.response) {
        const data = error.response.data;
        // const token = storage.get(ACCESS_TOKEN)
        if (error.response.status === 403) {
            console.error({
                message: "Forbidden",
                description: data.message,
            });
        }
        if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            console.error({
                message: "未登录",
                description: "权限验证失败",
            });
        }
    }
    return Promise.reject(error);
};

export default request;

export { request as axios };
