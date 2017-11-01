/**
 * Created by joyer on 17/8/14.
 */

import store from 'conf@/store';
import config from 'conf@';
import axios from 'axios';
import { UtlSystem,UtlLang } from 'com@';

const UTL = {};

/**
 * 重新进入应用
 * @return {Promise.<*>}
 */
function resetIntoUserAppFont() {
    UtlSystem.reenterSystem({
        storeId:store.state.storeId,
        tableId:store.state.tableId,
        tableAuthCode:store.state.tableAuthCode
    });
    return Promise.reject("未授权,请先授权");
}

/**
 * 生成权限拦截器的工厂函数
 * @param isTableAuth 是否需要餐桌权限
 * @return {function(*)}
 */
UTL.authInterceptorFactory = ( isTableAuth = true ) => {
    return (config) => {
        // 如果不需要权限验证
        if(config.$_notPermission){
            return config;
        }
        // 是否有token
        let accessToken = store.state.user.info.accessToken;
        // 判断是否有Token
        if(accessToken){
            // TODO BUG
            // let type = store.state.user.info.tokenType;
            let type = "Bearer";
            config.headers['Authorization'] = type +' '+accessToken;
            if( isTableAuth ) {
                let tableToken = store.state.user.info.tableToken;
                if(tableToken) {
                    config.headers['TableAuthorization'] = tableToken;
                    return config;
                }
                return resetIntoUserAppFont();
            }
            return config;
        }
        return resetIntoUserAppFont();
    };
};

/**
 * 异常拦截器
 * @param error
 * @return {Promise.<*>}
 */
UTL.errorInterceptor = (error) => {
    if(typeof error === 'string')
        return Promise.reject(error);
    else console.log("error",error);
    return Promise.reject("网络出现点小问题");
};

/**
 * 处理响应的函数
 * @param response
 * @return {Promise}
 */
UTL.responseInterceptor = (response) => {
    console.log(JSON.parse(JSON.stringify(response)));
    return new Promise( (res,rej) => {
        let data = response.data;
        const factory = {
            ['success'] (){
                res(data.data);
            },
            ['401'] () {
                resetIntoUserAppFont();
                rej("权限不足");
            }
        };
        if(response.status === 200) {
            if(data){
                UtlLang.strategy(factory,data.code + '',()=> {
                    rej(data.msg || "我也不知道为什么,他就是出来一个错误");
                },false);
            }else
                rej("网络出现点小问题1");
        } else {
            UtlLang.strategy(factory,response.status + '',()=> {
                rej(data.msg || "我也不知道为什么,他就是出来一个错误");
            },false);
        }
    } );
};

/**
 * 获取axios实例
 * @param baseURL 基础url
 * @param requestSuccessInterceptor 成功的请求拦截
 * @param requestErrorInterceptor 失败的请求拦截
 * @param responseSuccessInterceptor 成功的响应拦截
 * @param responseErrorInterceptor 失败的响应拦截
 * @param timeout 超时时间
 * @return {*} axios实例
 */
UTL.getFetch = (
    baseURL = config.dataUrl,
    requestSuccessInterceptor = UTL.authInterceptorFactory(),
    requestErrorInterceptor = UTL.errorInterceptor,
    responseSuccessInterceptor = UTL.responseInterceptor,
    responseErrorInterceptor = UTL.errorInterceptor,
    timeout = config.requestTimeout
) =>{
    const fetch = axios.create({ baseURL,timeout });
    fetch.interceptors.request.use(requestSuccessInterceptor,requestErrorInterceptor);
    fetch.interceptors.response.use(responseSuccessInterceptor,responseErrorInterceptor);
    return fetch;
};


export default UTL;