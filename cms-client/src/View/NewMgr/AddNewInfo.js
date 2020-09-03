import React, { Component } from 'react'
import {Modal} from 'antd'
import AddNewFrm from './AddNewFrm'
class AddNewInfo extends Component{
    frmAddFrm=null;
  
     state={
         content:'',
         cId:0
     }
     getChildContent=(content)=>{
         this.setState({content})
     }
     getChildId=(cId)=>{
         this.setState({cId})
     }
    clearFrm=(frm) => {
        this.frmAddFrm= frm.current
     }
    handleAddNew=()=>{
        // console.log(this.frmAddFrm.getFieldsValue())
        let body=this.frmAddFrm.getFieldsValue();
        body.content=this.state.content;
        body.cId=parseInt(this.state.cId);
        body.photoUrl=process.env.REACT_APP_BASEURL+body.photoUrl
        this.props.addNewInfo(body)
    }
    render(){
        return (
            <Modal style={{width:'800'}}
            visible={this.props.visible}
            onCancel={()=>this.props.close()}     
            destroyOnClose
            title='添加新闻内容'
            okText='添加'
            cancelText='取消'
            onOk={this.handleAddNew}
            width='800px'
            >
                <AddNewFrm getChildContent={this.getChildContent}
                getChildId={this.getChildId}
                clear={this.clearFrm}></AddNewFrm>
            </Modal>
        )
    }
}
export default AddNewInfo