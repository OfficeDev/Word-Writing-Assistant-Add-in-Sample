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

export default request;

export { request as axios };
