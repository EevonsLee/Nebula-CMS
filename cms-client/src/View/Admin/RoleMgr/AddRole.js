import React,{Component} from 'react'
import {Modal,Form,Input} from 'antd'
class AddRole extends Component{
    formRef = React.createRef();
    handleAddRole=()=>{
        // console.log(this.formRef.current.getFieldsValue())
        this.props.addRole(this.formRef.current.getFieldsValue())
    }
    render(){
        return(
            <div>
                <Modal
                visible={this.props.visible}
                onCancel={()=>this.props.close()}
                title="添加角色"
                okText='确定'
                cancelText='取消'
                onOk={this.handleAddRole}
                >
              <Form ref={this.formRef} style={{width:300}}
                >
                    <Form.Item name="roleName" rules={[{required:true,message:'请输入角色名称'}]} >
                       <Input placeholder='请输入角色名称'></Input>

                    </Form.Item>
                
                     <Form.Item name='remark' rules={[{required:true,message:'请输入备注信息'}]}>
                         <Input placeholder='请输入备注信息'></Input>
                     </Form.Item>
          
                </Form>
                </Modal>

            </div>
        )
    }
}
export default AddRole