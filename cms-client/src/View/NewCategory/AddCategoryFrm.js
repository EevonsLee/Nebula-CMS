import React,{Component} from 'react'
import {Form,Input} from 'antd'
class AddCategoryFrm extends Component{
    formRef = React.createRef();
    componentDidMount(){
        this.props.clear(this.formRef)
    }
    render(){
        return (
            <Form ref={this.formRef} style={{width:300}}
                >
                    <Form.Item name="articelType" rules={[{required:true,message:'请输入类别名称'}]} >
                       <Input placeholder='请输入类别名称'></Input>

                    </Form.Item>
                
                     <Form.Item name='remark' rules={[{required:true,message:'请输入备注信息'}]}>
                         <Input placeholder='请输入备注信息'></Input>
                     </Form.Item>
          
                </Form>
        )
    }
}
export default AddCategoryFrm