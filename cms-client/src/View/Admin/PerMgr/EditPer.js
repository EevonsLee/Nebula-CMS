import React,{Component} from 'react'
import {Modal,message} from 'antd'
import EditPerFrm from './EditPerFrm'
class EditPer extends Component{
    EditFrm=null
    clearFrm=(frm) => {
       this.EditFrm= frm.current
    }
    handleEditPer=()=>{
        // console.log(this.EditFrm.getFieldsValue())
        let newPer=Object.assign({},this.props.data,this.EditFrm.getFieldsValue());
        this.props.submitEditPer(newPer).then(res=>{
            message.info('权限编辑成功!!')
            this.props.loadDataAsync(this.props.params)
            this.props.close()
        }).catch(err=>{
            console.log(err);
            message.error('权限编辑失败')
        })
    }
    render(){
        return(
            <Modal
            visible={this.props.visible}
            onCancel={()=>this.props.close()}
            destroyOnClose
            okText='修改'
            cancelText='取消'
            title='修改权限'
            onOk={this.handleEditPer}
            >
           <EditPerFrm data={this.props.data} clear={this.clearFrm}></EditPerFrm>
            </Modal>
        )
    }
}
export default EditPer