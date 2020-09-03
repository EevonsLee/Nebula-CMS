import ActionTypes from '../Action/ActionTypes'
export default function UserReducer(preState={list:[],total:0},action){
    switch(action.type){
        case ActionTypes.LOAD_USER_LIST:
            return action.payload;
         case ActionTypes.ADD_USER:
                preState.list.shift(action.payload)
                preState.total+=1
                return {...preState}
          case ActionTypes.EDIT_USER:
              
                  let preUserIndex=preState.list.findIndex(item=>item.id===action.payload.id) 
                  preState.list.splice(preUserIndex,1,action.payload)
                   return {...preState}
         default:
             return preState   
    }

}