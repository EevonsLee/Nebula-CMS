import React,{Component} from 'react'
import { Modal} from 'antd'
import EditRoleFrm from './EditRoleFrm'
class EditRole extends Component{
    EditFrm=null    
    clearFrm=(frm) => {
       this.EditFrm= frm.current
    }
    handleEditRole=()=>{
        //   console.log(this.EditFrm.getFieldsValue())
        this.props.saveRole(Object.assign({},this.props.data,this.EditFrm.getFieldsValue()))
    }
    
    render(){
        return(
            <div>
                <Modal
                title="编辑角色信息"
                okText='确定'
                destroyOnClose
                cancelText='取消'
                visible={this.props.visible}
                onCancel={()=>{
                    this.props.close();
                }}
                onOk={this.handleEditRole}
                >
                   <EditRoleFrm data={this.props.data} clear={this.clearFrm}></EditRoleFrm>
                </Modal>
            </div>
        )
    }
}
export default EditRole