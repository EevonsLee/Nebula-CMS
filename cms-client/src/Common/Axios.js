import axios from 'axios' //npm install axios
import Qs from 'qs'
import {getLoginToken} from './Auth';
// axios.interceptors.request.use(function(config){
//     // 判断当前登录用户是否拥有请求此地址的权限，如果有那么继续访问，如果没有请求终止
//     let url=config.url;// 获取当前请求的url地址
//     // console.log('url=',url);
//     let loginUserPerStr=JSON.parse(sessionStorage.getItem('LOGIN_USER_STR'));
//     if(loginUserPerStr!==null){
//         let authorized=loginUserPerStr.findIndex(per=>per.actionUrl===url);
//         if(authorized<0){
//             return Promise.reject({msg:'没有权限'})
//         }
//     }
//     // console.log('method=',config.method)
//     return config
    
// },function(error){
//     return Promise.reject(error);
// })

export default class Axios{
    static ajaxPostAxios(options){
        axios.defaults.headers['Authorization']=getLoginToken();
        return new Promise((resolve,reject)=>{
            axios({
                url: options.url,
                method: options.method,
                timeout:5000,
                headers:{'Content-Type':'application/x-www-form-urlencoded'},
                data:Qs.stringify(options.data)
            }).then((response)=>{
                if(response.status===200){
                    let res=response.data
                    resolve(res)
                }else{
                    reject(response)
                }
            })
        })
    }
    static ajaxAxios(options){
        axios.defaults.headers['Authorization']=getLoginToken();
        return new Promise((resolve,reject)=>{
            axios({
                url: options.url,
                method:'get',
                timeout:5000,
                params: options.data
            }).then((response)=>{
                if(response.status===200){
                    let res=response.data
                    resolve(res)
                }else{
                    reject(response)
                }
            })
        })
    }
    static ajaxDeleteAxios(options){
        axios.defaults.headers['Authorization']=getLoginToken();
        return new Promise((resolve,reject)=>{
            axios({
                url: options.url,
                method:'delete',
                timeout:5000
            }).then((response)=>{
                if(response.status===200){
                    let res=response.data
                    resolve(res)
                }else{
                    reject(response)
                }
            })
        })
    }
  static ajaxPutAxios(options){
    axios.defaults.headers['Authorization']=getLoginToken();
    return new Promise((resolve,reject)=>{
        axios({
            url: options.url,
            method: options.method,
            timeout:5000,
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            data:Qs.stringify(options.data)
        }).then((response)=>{
            if(response.status===200){
                let res=response.data
                resolve(res)
            }else{
                reject(response)
            }
        })
    })
  }
}

