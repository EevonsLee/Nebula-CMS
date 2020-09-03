import React, { Component } from 'react'
import {Form,Input} from 'antd'
class AddUserFrm extends Component{
    formRef = React.createRef();
    componentDidMount(){
        this.props.clear(this.formRef)
    }

    render(){
        return(
            <div>
                <Form ref={this.formRef} style={{width:300}}
                >
                    <Form.Item name="userName" rules={[{required:true,message:'请输入用户名'},{
                        min:3,
                        max:20,
                        message:'用户名不在指定范围内'
                    },{
                        pattern:/^\w/g,
                        message:'用户名为数字或者字母'
                    }]} >
                       <Input placeholder='请输入用户名'></Input>

                    </Form.Item>
                    <Form.Item name="userPwd" rules={[{required:true,message:'请输入密码'}]}>
                     <Input placeholder='请输入密码' type="password"></Input>
                    
                    </Form.Item>
                     <Form.Item name='remark' rules={[{required:true,message:'请输入备注信息'}]}>
                         <Input placeholder='请输入备注信息'></Input>
                     </Form.Item>
          
                </Form>
            </div>
        )
    }
}
export default AddUserFrm