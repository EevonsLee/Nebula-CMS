import React,{Component} from 'react'
import {Modal,Checkbox,Row,Col,message} from 'antd'
import Service from '../../../Service'
class SetRole extends Component{
    state={
        allRoles:[],
        userRoles:[],
        allCheckedRoles:[] //存储的是当前选中的所有的角色数据。

    }
    // componentDidMount(){
    //     Service.loadUserRoles(this.props.data.id).then(res=>{
    //         this.setState({userRoles:res.data},()=>{
    //             //获取所有角色
    //             Service.loadAllRoles().then(res=>{
    //                 this.setState({allRoles:res.data});
    //             }).catch(err=>{
    //                 console.log(err)
    //             })
    //         })
    //     })      
    // }
    async componentDidMount(){
        let userRoles=await Service.loadUserRoles(this.props.data.id);
        let allRoles=await Service.loadAllRoles();
        let checkedRoleArr=[];
        userRoles.data.forEach(userRole=>{
            let roleInfo=allRoles.data.find(role=>role.id===userRole.roleId)
            if(roleInfo){
                checkedRoleArr.push(roleInfo)
            }
        })
        this.setState({allRoles:allRoles.data,userRoles:userRoles.data,allCheckedRoles:checkedRoleArr});
    }
    handleChangeCheckBox=(role,e)=>{
        // console.log(role);
        // console.log(e)
        let checkedRoleArr=[...this.state.allCheckedRoles];
        if(e.target.checked){
            checkedRoleArr.push(role);
        }else{
            checkedRoleArr=checkedRoleArr.filter(item=>item.id!==role.id);

        }
        this.setState({allCheckedRoles:checkedRoleArr})
    }
    handleSubmit=()=>{
        // console.log(this.state.allCheckedRoles)
       let {allCheckedRoles,userRoles}=this.state;
       let promiseArr=[]
       allCheckedRoles.forEach(role =>{
         let addRoleIndex=userRoles.findIndex(userRole=>userRole.roleId===role.id)
         if(addRoleIndex<0){
             //添加
            let p1= Service.addUserRole({
                 roleId: role.id,
                 userId:this.props.data.id
             })
             promiseArr.push(p1)
         }
       })
       userRoles.forEach(userRole=>{
           let searchRoleIndex=allCheckedRoles.findIndex(role=>role.id===userRole.roleId);
           if(searchRoleIndex<0){
               //删除
              let p2= Service.deleteUserRole(userRole.id);
              promiseArr.push(p2);
           }
       })
       Promise.all(promiseArr).then(res=>{
           message.info('用户角色分配成功');
           this.props.close()
       }).catch(err=>{
           message.error('用户角色分配失败')
           console.log(err)
       })
    }

    render(){   
        return(
            <Modal
            destroyOnClose
            title="为用户分配角色"
             okText="确定"
             cancelText="取消"
             visible={this.props.visible}
             onCancel={()=>{
                 this.props.close()
             }}
             onOk={this.handleSubmit}
            >
             <h3>为用户{this.props.data?this.props.data.userName:null}分配角色</h3>
             <hr/>
             <Row>
             {
                 this.state.allRoles.map(role=>{
                    let checked=false;
                    if(this.state.userRoles.find(userRole=>userRole.roleId===role.id)){
                        checked=true
                    }
                     return(
                         <Col span={8} key={role.id}>
                            <Checkbox defaultChecked={checked} onChange={(e)=>{this.handleChangeCheckBox(role,e)}}>
                                    {role.roleName}
                            </Checkbox>
                         </Col>
                     
                     )
                 })
             }
             </Row>
            </Modal>
        )
    }
}
export default SetRole