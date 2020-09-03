import React,{Component} from 'react'
import {Form,Input, Select} from 'antd'
class AddPerFrm extends Component{
    formRef = React.createRef();
    componentDidMount(){
        this.props.clear(this.formRef)
    }

    render(){
        const {Option}=Select
        return(
            <div>
 <Form ref={this.formRef} style={{width:300}}
                >
                    <Form.Item name="actionName" rules={[{required:true,message:'请输入权限名称'}]} >
                       <Input placeholder='请输入权限名称'></Input>

                    </Form.Item>
                    <Form.Item name='actionType' rules={[{required:true,message:'请选择限类型'}]}>
                            <Select >
                                <Option value="menu">菜单权限</Option>
                                <Option value="action">请求权限</Option>
                                <Option value="router">路由权限</Option>
                                <Option value="resource">资源权限</Option>
                                <Option value="component">组件权限</Option>
                            </Select>   
                    </Form.Item>
                

                    <Form.Item name='actionCode' rules={[{required:true,message:'请输入权限码'}]}>
                         <Input placeholder='请输入权限码'></Input>
                     </Form.Item>
          

                     <Form.Item name='actionUrl' rules={[{required:true,message:'请输入权限地址'}]}>
                         <Input placeholder='请输入权限地址'></Input>
                     </Form.Item>


                     <Form.Item name='pId' rules={[{required:true,message:'请输入父级权限'}]}>
                         <Input placeholder='请输入父级权限'></Input>
                     </Form.Item>

                     <Form.Item name='remark' rules={[{required:true,message:'请输入备注信息'}]}>
                         <Input placeholder='请输入备注信息'></Input>
                     </Form.Item>
          
                </Form>
            </div>
        )
    }
}
export default AddPerFrm