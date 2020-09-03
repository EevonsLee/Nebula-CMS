import React, { Component } from 'react'
import {Form,Input } from 'antd'
import service from '../../../Service';
class EditRoleFrm extends Component {  
    formRef = React.createRef();
    componentDidMount(){
        const roleId=this.props.data[0].id;
          service.getRoleInfo(roleId).then(res=>{
            this.formRef.current.setFieldsValue({
                roleName:res.data.roleName,
                remark:res.data.remark
            })
          })
        // this.formRef.current.setFieldsValue({
        //     roleName:this.props.data[0].roleName,
        //     remark:this.props.data[0].remark
        // })
        this.props.clear(this.formRef)
    }  
    render(){
        return(
            <div>
 <Form ref={this.formRef} style={{width:300}}
                >
                    <Form.Item name="roleName" rules={[{required:true,message:'请输入角色名称'}]} >
                       <Input placeholder='请输入角色名称'></Input>

                    </Form.Item>
                
                     <Form.Item name='remark' rules={[{required:true,message:'请输入备注信息'}]}>
                         <Input placeholder='请输入备注信息'></Input>
                     </Form.Item>
          
                </Form>
            </div>
        )
    }
}
export default EditRoleFrm