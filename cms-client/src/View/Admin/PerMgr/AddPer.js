import React,{Component} from 'react'
import {Modal, message} from 'antd'
import AddPerFrm from './AddPerFrm'
import {GetLoginUserInfo} from '../../../Common/Auth'
class AddPer extends Component{
    AddFrm=null
    clearFrm=(frm) => {
       this.AddFrm= frm.current
    }
    handlePerAdd=()=>{
    //    console.log(this.AddFrm.getFieldsValue())
      const newPer=Object.assign({
          actionSubby:GetLoginUserInfo().id,
          delFlag:0
      },this.AddFrm.getFieldsValue())
      this.props.addPer(newPer).then(res=>{
          message.info('权限添加成功')
          this.props.loadData();
          this.props.close();
      }).catch(err=>{
          console.log(err);
          message.error('权限添加失败')
      })
    }
    render(){
        return(
            <div>
                <Modal
                visible={this.props.visible}
                onCancel={()=>this.props.close()}
                okText='添加'
                cancelText='取消'
                title='添加权限信息'
                destroyOnClose
                onOk={this.handlePerAdd}
                >
                    <AddPerFrm clear={this.clearFrm}></AddPerFrm>
                </Modal>
             
            </div>
        )
    }
}
export default AddPer