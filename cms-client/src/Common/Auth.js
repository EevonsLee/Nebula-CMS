import Service from "../Service";

const APP_LOGIN_USER='APP_LOGIN_USER'
//判断当前用户是否登录
export function AuthLoin(){
    let loginUserStr=sessionStorage.getItem(APP_LOGIN_USER);
    if(loginUserStr){
        return true;
    }
    return false;
}
//存储当前用户登录的信息.
export function SaveLoginUserInfo(user){
    sessionStorage.setItem(APP_LOGIN_USER,JSON.stringify(user))
}
export function SaveLoginToken(token){
    sessionStorage.setItem('Authorization',token)
}
export function getLoginToken(){
    return sessionStorage.getItem('Authorization')
}
export function GetLoginUserInfo(){
   let userstr=sessionStorage.getItem(APP_LOGIN_USER)
   if(userstr){
       return JSON.parse(userstr)
   }
   return null;
}
export function Logout(){
    sessionStorage.clear()
}
// 获取当前登录用户的所有权限。
export function getLoginUserAllPer(){
    let userId=GetLoginUserInfo().id;
    let loginUserPerStr=sessionStorage.getItem('LOGIN_USER_STR');
    if(loginUserPerStr){
        return Promise.resolve(JSON.parse(loginUserPerStr));
    }
  return  Service.getUserAction(userId).then(res=>{
        sessionStorage.setItem('LOGIN_USER_STR',JSON.stringify(res.data));
        return res.data
    })
}


