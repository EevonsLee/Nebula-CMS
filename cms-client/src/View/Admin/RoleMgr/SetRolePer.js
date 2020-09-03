import React,{Component} from 'react';
import {Row,Col,Checkbox,message} from 'antd'
import service from '../../../Service'
class SetRolePer extends Component{
    state={
        allPer:[], // 所有的权限
        rolePer:[],// 存储当前角色已经具有的权限
        allCheckedPer:[] // 存储了当前在页面中选中的权限信息。
    }
    async componentDidMount(){
        // 加载所有的权限数据
        let allPer=await service.loadAllPer().then(res=>res.data);
        // 获取当前角色已经具有的权限数据
        let rolePer=await service.loadRolePer(this.props.data.id).then(res=>res.data);
        // 将当前角色已经具有的权限数据存储到allCheckedPer数组中(当前角色已经具有的权限，会在窗口中默认选中)
        let allCheckedPer=[];
        rolePer.forEach(rolePer=>{
           let per=allPer.find(per=>per.id===rolePer.actionId);
           if(per){
            allCheckedPer.push(per);
           }
        })
        this.setState({
            allPer,
            rolePer,
            allCheckedPer
        })
    }
    handleChangeChecked=(per,e)=>{
        let allCheckedPer=[...this.state.allCheckedPer];
        if(e.target.checked){
            allCheckedPer.push(per);
        }else{
            // 如果将一个选中的权限取消了选中，应该将其从allCheckedPer数组中移除。
            allCheckedPer=allCheckedPer.filter(item=>item.id!==per.id)
        }
        this.setState({allCheckedPer})
    }
    handleSubmitSetRole=()=>{
        let {allCheckedPer,rolePer}=this.state
        let promiseArr=[]
        // 添加权限
        allCheckedPer.forEach(per=>{
            if(rolePer.findIndex(rp=>rp.actionId===per.id)<0){
                promiseArr.push(service.addRolePer({
                    roleId:this.props.data.id,
                    actionId:per.id
                }))
            }
        })
        // 删除
        rolePer.forEach(rp=>{
            if(allCheckedPer.findIndex(per=>per.id===rp.actionId)<0){
                promiseArr.push(service.deleteRolePer(rp.id))
            }
        })
        Promise.all(promiseArr).then(res=>{
            message.info('为角色分配权限成功');
            this.props.close();
        }).catch(err=>{
            message.error('为角色分配权限失败')
            console.log(err)
        })

    }
    render(){
        let {allPer,rolePer}=this.state
        return (
            <div>
               <h3>为角色<span style={{color:'red'}}>{this.props.data.roleName}</span>分配权限</h3>
               <hr/>
                    <Row>
                          {
                              allPer.map(per=>{
                                  let checked=false;
                                 let index=rolePer.findIndex(rp=>rp.actionId===per.id);
                                 checked=index>=0
                                  return(
                                      <Col span={8} key={per.id}>
                                          <Checkbox defaultChecked={checked} onChange={(e)=>{this.handleChangeChecked(per,e)}}>
                                              {per.actionName}
                                          </Checkbox>
                                      </Col>
                                  )
                              })
                          }  

                    </Row>
            </div>
        )
    }
}
export default SetRolePer