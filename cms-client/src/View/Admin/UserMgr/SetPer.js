import React,{Component} from 'react'
import {Modal,Row,Col,Checkbox, message} from 'antd'
import service from '../../../Service'
class SetPer extends Component{
    state={
        allPer:[],//所有的权限
        userPer:[],//当前用户具有的权限
        allCheckedPer:[] //选中的权限
    }
    async componentDidMount(){
        let allPer=await service.loadAllPer().then(res=>res.data);
        let userPer=await service.loadUserPer(this.props.data.id).then(res=>res.data);
        let allCheckedPer=[]
        userPer.forEach(uper=>{
            let perObj=allPer.find(per=>per.id===uper.actionId)
            if(perObj){
                allCheckedPer.push(perObj)
            }
        })
        this.setState({
            allPer,
            userPer,
            allCheckedPer
        })
    }
    hanldeChangeCheckBox=(per,e)=>{
        let allCheckedPer=[...this.state.allCheckedPer];
        if(e.target.checked){
            allCheckedPer.push(per);
        }else{
            allCheckedPer=allCheckedPer.filter(item=>item.id!==per.id)
        }
        this.setState({allCheckedPer})
    }
    handleSubmit=()=>{
       let {allCheckedPer,userPer}=this.state;
       let promiseArr=[];
       allCheckedPer.forEach(per=>{
           if(userPer.findIndex(uper=>uper.actionId===per.id)<0){
            promiseArr.push(service.addUserPer({
                   userId:this.props.data.id,
                   actionId:per.id,
                   delFlag:0
               }))
           }
       })
       userPer.forEach(uper=>{
           if(allCheckedPer.findIndex(per=>per.id===uper.actionId)<0){
               promiseArr.push(service.deleteUserPer(uper.id))
           }
       })
       Promise.all(promiseArr).then(res=>{
           message.info('为用户分配权限成功');
           this.props.close()
       }).catch(err=>{
           console.log(err);
           message.error('为用户分配权限失败')
       })
    }
    render(){
        let {allPer,userPer}=this.state
        return(
            <Modal
            destroyOnClose
            title="为用户分配权限"
             okText="确定"
             cancelText="取消"
             visible={this.props.visible}
             onCancel={()=>{
                 this.props.close()
             }}
             onOk={this.handleSubmit}
            >
                <h3>
            为用户<span style={{color:'red'}}>{this.props.data.userName}</span>分配权限
                </h3>
                <hr/>
                <Row>
                    {
                        allPer.map(per=>{
                            let checked=false;
                            checked=userPer.findIndex(uper=>uper.actionId===per.id)>=0;
                            return (
                                <Col key={per.id} span={8}>
                                    <Checkbox defaultChecked={checked} onChange={(e)=>{this.hanldeChangeCheckBox(per,e)}}>
                                        {per.actionName}
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
export default SetPer