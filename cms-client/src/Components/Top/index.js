import React,{Component,Fragment} from 'react'
import {GetLoginUserInfo,Logout} from '../../Common/Auth'
import {Modal} from 'antd'
import './top.css'
class Top extends Component{ 
    state={
        loginUser:GetLoginUserInfo()
    } 
    handleLogout=()=>{
        let {history}=this.props
        Modal.confirm({
            title:'系统退出提示',
            content:'你确定要退出系统吗?',
            okText:'退出',
            cancelText:'取消',
            onOk:()=>{
                Logout();
                history.push('/login')
            }
        })
    }
    render(){
        return(
            <Fragment>
             {/* 左侧区域 */}
             <div className='logo-wrap'>
                <a href='/'>
                    <h1 style={{color:'#fff',fontSize:'30px'}}>
                        CMS后台管理系统
                    </h1>
                </a>
             </div>
             {/* 右侧区域 */}
             <div className='user-wrap'>
                <div className='btn-group'>
        <span>{this.state.loginUser&&this.state.loginUser.userName}</span>
                </div>
                <div className='btn-group' onClick={this.handleLogout}>
                    退出
                    </div>
             </div>
            </Fragment>
        )
    }
}
export default Top  