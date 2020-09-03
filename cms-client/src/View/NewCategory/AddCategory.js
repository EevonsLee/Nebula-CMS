import React,{Component} from 'react'
import AddCategoryFrm from './AddCategoryFrm'
import {Modal} from 'antd'
class AddCategory extends Component{
    frmAddFrm=null;
    clearFrm=(frm) => {
        this.frmAddFrm= frm.current
     }
    handleAddCategory=()=>{
        //    console.log(this.frmAddFrm.getFieldsValue())
          this.props.addCategory(this.frmAddFrm.getFieldsValue())
      
    }
   render(){
       return(
        <Modal 
        visible={this.props.visible}
        onCancel={()=>this.props.close()}     
        destroyOnClose
        title='添加类别'
        okText='添加'
        cancelText='取消'
        onOk={this.handleAddCategory}
        >
            <AddCategoryFrm clear={this.clearFrm}></AddCategoryFrm>
        </Modal>
       )
    
       
   }
}
export default AddCategory