import React, { Component } from 'react'
import {Modal,message} from 'antd'
import AddUserFrm from './AddUserFrm'
import store from '../../../store'
import { AddUserActionAsync } from '../../../Action/UserAction'
class AddUser extends Component {
    AddFrm=null
    clearFrm=(frm) => {
       this.AddFrm= frm.current
    }
    handleSubmit=()=>{
        // console.log('users=',this.AddFrm.getFieldsValue())
        store.dispatch(AddUserActionAsync(this.AddFrm.getFieldsValue())).then(res=>{
            message.info('添加成功')
            this.props.close();
            this.AddFrm.resetFields()
        }).catch(()=>{
            message.error('添加失败！')
        })
    }
    render(){
        return(
            <div>
                <Modal
                title="添加用户信息"
                okText='确定'
                cancelText='取消'
                visible={this.props.visible}
                onCancel={()=>{
                    this.props.close()
                     this.AddFrm.resetFields()
                    }
                }
                onOk={this.handleSubmit}
                >
                   <AddUserFrm clear={this.clearFrm}></AddUserFrm>
                </Modal>
            </div>
        )
    }
}
export default AddUser