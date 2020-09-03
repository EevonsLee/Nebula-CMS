import React,{Component} from 'react';
import {Modal,message} from 'antd'
import EditUserFrm from './EditUserFrm'
import store from '../../../store';
import { EditUserActionAsync,LoadUserActionAsync } from '../../../Action/UserAction';
class EditUser extends Component{
    AddFrm=null
    
    clearFrm=(frm) => {
       this.AddFrm= frm.current
    }
    handleSubmit=()=>{
        // console.log('users=',this.AddFrm.getFieldsValue())
        let newUser={...this.props.data,...this.AddFrm.getFieldsValue()}
        // console.log('newUser=',newUser)
        store.dispatch(EditUserActionAsync(newUser)).then(res=>{
            store.dispatch(LoadUserActionAsync(this.props.params))
            message.info('修改数据成功')
            this.props.close()
        }).catch(err=>{
            console.log('err=',err)
            message.error('修改失败')
        })
    }
    render(){
        return(
            <div>
                    <Modal
                     title="编辑用户信息"
                     okText='确定'
                     cancelText='取消'
                     destroyOnClose
                     visible={this.props.visible}
                     onCancel={()=>{
                         this.props.close()
                     }}
                     onOk={this.handleSubmit}
                    >
                        编辑
                        <EditUserFrm data={this.props.data}  clear={this.clearFrm}></EditUserFrm>
                    </Modal>
            </div>
        )
    }
}
export default EditUser