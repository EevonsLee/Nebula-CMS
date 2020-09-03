import{combineReducers} from 'redux'
import UserReducer from './UserReducer'
import PerReducer from './PreReducer'
export default combineReducers({
    UserList:UserReducer,
    PerList:PerReducer
})