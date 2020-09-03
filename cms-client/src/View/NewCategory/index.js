import React,{Component} from 'react'
// import {Link,Route,Switch} from 'react-router-dom'
// import AuthRoute from '../../Components/AuthRoute'
import service from '../../Service'
import AddCategory from './AddCategory'
import {GetLoginUserInfo} from '../../Common/Auth'
import {Table,Button, message} from 'antd'
let treeData=[]
class NewCategory extends Component{
    columns = [
        {title: '编号',dataIndex: 'id',key: 'id'},
        {title: '类别名称',dataIndex: 'articelType',key: 'articelType'},
        {title: '备注',dataIndex: 'remark',key: 'remark'},
        {
            title: '操作', dataIndex: 'id', key: 'rowId', render: (id,row) => { 
            return <span >
                    <Button onClick={()=>{
                      console.log('row===',row)
                    }} >编辑</Button> 
                   <Button> 删除</Button>
                {
                    row.parentId ===0?<Button
                    onClick={()=>{
                        this.handleAdd(id)
                    }}>新增子级类别</Button>
                    :''
                }
                    
                </span>
            }
        }
    ];
    state = {
        datas : [],
        showAddCategoryDialog:false,
        parentId:0
    }
    componentDidMount(){
      this.loadData()
    }
    componentWillUnmount(){
        treeData=[];
    }
    //展示添加表单
    handleAdd=(id)=>{
        this.setState({showAddCategoryDialog:true,parentId:id})
    }
    // 关闭窗口
    closeAddDialog=()=>{
        this.setState({showAddCategoryDialog:false})
    }
    loadData=()=>{
        return  service.loadAllNewClass().then(res=>{
            this.initTreeData(res.data,null)
            this.setState({datas:treeData})
        })
    }
    // 添加新闻类别
   addCategory=(values)=>{
    //    console.log(values);
      let obj={
          createUserId:GetLoginUserInfo().id,
          parentId:this.state.parentId
      }
      values={...values,...obj}
      service.addNewClass(values).then(res=>{
          message.info('新闻类别添加成功')
          this.closeAddDialog();
          treeData=[];
          this.loadData();
      }).catch(err=>{
          console.log(err);
          message.error('新闻类别添加失败')
      })
   }
    initTreeData(list,item){
        if(!item){
            list.filter(c=>c.parentId===0).map(c=>{
                let obj={
                    key:c.id,
                    id:c.id,
                    articelType:c.articelType,
                    remark:c.remark,
                    parentId:c.parentId,
                    children:[]
                }
                treeData.push(obj)
                this.initTreeData(list,obj)
            })
        }else{
            list.filter(c=>c.parentId===item.id).map(c=>{
                let obj={
                    id:c.id,
                    articelType:c.articelType,
                    remark:c.remark,
                    parentId:c.parentId
                }
                item.children.push(obj)
            })
        }
    }
    render(){
        return (

        <div>
 <Button type="primary" onClick={()=>this.handleAdd(0)}>新增根类别</Button>
            <Table  columns={this.columns}  bordered  
                        defaultExpandAllRows ={true} dataSource={this.state.datas}
                            rowKey = {row=>row.id} 
                            expandedRowKeys={this.state.datas.map(c=>c.id)}
                        />
                             <AddCategory
              close={this.closeAddDialog} 
              visible={this.state.showAddCategoryDialog}
              addCategory={this.addCategory}
              ></AddCategory>
        </div>


//             <div>
//                <Link to={`${this.props.match.path}/c1`}>类别1</Link>
//                <Link to={`${this.props.match.path}/c2`}>类别2</Link>
//                <hr/>
//                <Switch>
//                    <AuthRoute per={13} path={`${this.props.match.path}/c1`} render={()=>{
//                        return (<h2>新闻类别1</h2>)
//                    }}></AuthRoute>

// <AuthRoute per={14} path={`${this.props.match.path}/c2`} render={()=>{
//                        return (<h2>新闻类别2</h2>)
//                    }}></AuthRoute>
//                </Switch>
//             </div>
        )
    }
}
export default NewCategory