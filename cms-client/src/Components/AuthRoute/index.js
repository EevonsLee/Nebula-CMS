import React,{Component,Fragment} from 'react'
import{Route} from 'react-router-dom'
import {getLoginUserAllPer} from '../../Common/Auth'
class AuthRoute extends Component{
    state={
        authorized:false
    }
    componentDidMount(){
        getLoginUserAllPer().then(res=>{
           let authorized= res.findIndex(per=>per.id===this.props.per)>=0;
           this.setState({authorized})
        })
    }
    UNSAFE_componentWillReceiveProps(){
        getLoginUserAllPer().then(res=>{
            let authorized= res.findIndex(per=>per.id===this.props.per)>=0;
            this.setState({authorized})
         })
    }
    render(){
        return (
            <Fragment>
                {
                    this.state.authorized?<Route {...this.props}></Route>:
                    <Route path={this.props.path} render={()=>(<h3>没有权限</h3>)}></Route>
                }
            </Fragment>
        )
    }
}
export default AuthRoute