import ActionTypes from './ActionTypes'
import service from '../Service'
export function LoadUserAction(payload){
    return{
        type: ActionTypes.LOAD_USER_LIST,
        payload
    }
}
export  function LoadUserActionAsync(params){
    return  dispatch=>{
        return service.loadUserList(params).then(res=>{
            let total=parseInt(res.count)
            dispatch(LoadUserAction({list:res.data,total:total}))
        })
    }
}
export function AddUserAction(payload){
    return {
        type:ActionTypes.ADD_USER,
        payload
    }
}
export function AddUserActionAsync(payload){
  return dispatch=>{
      return service.addUser(payload).then(res=>{
          dispatch(AddUserAction(res.data))
      })
  }
}
export function EditUserAction(payload){
    return{
        type:ActionTypes.EDIT_USER,
        payload
    }
}
export function EditUserActionAsync(payload){
    return dispatch=>{
        return service.editUser(payload).then(res=>{
            dispatch(EditUserAction(res.data))
        })
    }
}