import React, { Component} from 'react';
import {Form,Input,Button,message} from 'antd'
import service from '../../Service'
import {SaveLoginUserInfo,SaveLoginToken} from '../../Common/Auth'
import {urlParams2Object} from '../../Common/Helper'
// import 'antd/dist/antd.css'
class Login extends Component{
    formRef = React.createRef();
     // 单击登录按钮的时候开始进行校验
      onFinish = values => {
    
        // console.log('Received values of form: ', values);
        let {history,location}=this.props;
        service.userLogin(values).then(res=>{
            // console.log(res.data);
            if(res.code===0){
                SaveLoginUserInfo(res.data)
                SaveLoginToken(res.myToken)
                let url='/home'
                if(location.search){
                   let params=urlParams2Object(location.search);
                   if(params.url){
                    url=params.url
                   }
                }
                history.push(url)
            }else{
                message.error(res.msg)
            }
        })
      };
      handleClick=()=>{
       console.log('values=',this.formRef.current.getFieldsValue());
      }
      changeCode=(e)=>{
          e.target.src='/api/code/?id='+Date.now()
      }
      handleChange=(e)=>{
        service.validateCode(e.target.value).then(res=>{
            if(res.code===1){
                message.error(res.msg)
            }else{
                message.success(res.msg)
            }
        })
      }
    render(){
        return(
            <div style={{marginLeft:300}}>
                <Form ref={this.formRef} style={{width:300}} onFinish={this.onFinish}
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
                     <Form.Item name='userCode' rules={[{required:true,message:'请输入验证码'}]}>
                         <Input placeholder='请输入验证码' onBlur={this.handleChange}></Input>
                     </Form.Item>
                     <img src='/api/code' alt='验证码' onClick={e=>this.changeCode(e)}/>
                    <Form.Item>
                        <Button type="primary"  htmlType="submit" >登录</Button>&nbsp;
                        <Button type="primary" onClick={this.handleClick}>登录2</Button>
                    </Form.Item>
                </Form>
                
            </div>
        )
    }
}
export default Login