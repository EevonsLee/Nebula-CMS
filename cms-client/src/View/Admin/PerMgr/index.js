import React,{Component} from 'react'
import {Breadcrumb,Table,Button, Input,message,Popconfirm, Modal} from 'antd'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { LoadPerAsync,AddPerAsync,EditPerAsync,DeletePerAsync } from '../../../Action/PerAction'
import AddPer from './AddPer'
import EditPer from './EditPer'
function mapStateToProps(state){
    return{
        total: state.PerList.total,
        perList:state.PerList.list
    }
}
function mapDispatchToProps(dispatch){
    return {
       loadDataAsync:(params)=>{
          dispatch(LoadPerAsync(params))
       },
       addPer:(per)=>{
           return dispatch(AddPerAsync(per))
       },
       submitEditPer:(per)=>{
           return dispatch(EditPerAsync(per))
       },
       sumbitDeletePer:(ids)=>{
           return dispatch(DeletePerAsync(ids))
       }
    }
}

class PerMgr extends Component{
    state = {
      params:{page:1,limit:3,q:'',sort:'id',order:'desc'},
      showAddPerDialog:false,
      showEditPerDialog:false,
      editRow:null,
      selectedRowKeys:[]
    }
    loadData=()=>{
        this.props.loadDataAsync(this.state.params)
    }
    handleSearch=(value)=>{
        this.setState(preState=>{
            let newState={...preState}
            newState.params.q=value
            return newState
        },()=>{
            this.loadData()
        })
    }
    hideAddPerDialog=()=>{
        this.setState({
            showAddPerDialog:false
        })
    }
    hadleAdd=()=>{
        this.setState({
            showAddPerDialog:true
        })
    }
    changePage=(page,pageSize)=>{
        this.setState(preState=>{
            preState.params.page=page;
            preState.params.limit=pageSize;
            return {...preState}
        },()=>{
            this.loadData()
        })
    }

    hideEditPerDialog=()=>{
        this.setState({
            showEditPerDialog:false
        })
    }
    showEdit=()=>{
       if(this.state.selectedRowKeys.length!==1){
        message.warn('请选择1条要编辑的数据')
       }else{
        this.setState({
            showEditPerDialog:true
        })
       }
    }
    deletePerIds=(ids)=>{
        this.props.sumbitDeletePer(ids).then(res=>{
            message.info('权限删除成功');
            let arr=this.state.selectedRowKeys;
            let newArr=arr.filter(item=>!ids.includes(item))
            this.setState({selectedRowKeys:newArr})
            this.loadData();
        }).catch(err=>{
            console.log('err=',err);
            message.error('权限删除失败')
        })
    }
    handleDelete=()=>{
     if(this.state.selectedRowKeys.length<=0){
         message.error('请选择要删除的权限数据')
         return
     }
     Modal.confirm({
         title:'确定要删除吗?',
         okText:'确定',
         cancelText:'取消',
         onOk:()=>{
             this.deletePerIds(this.state.selectedRowKeys)
         }
     })

    }
    // addPer=(per)=>{

    // }
    // 定义数据源
    componentDidMount(){
        // const dataSource=[
        //     {
        //         id:1,
        //         actionName:'用户管理',      
        //         remark:'用户管理的权限'
        //     },
        //     {
        //         id:2,
        //         actionName:'角色管理',   
        //         remark:'角色管理的权限'
        //     },
        //     {
        //         id:3,
        //         actionName:'新闻管理',               
        //          remark:'新闻管理权限'
        //     }
        // ]
        // this.setState({dataSource})
        this.loadData()
    }
    render(){
         // 定义表头
         const columns=[{
            title:'编号', // 表头文本
            dataIndex:'id' // 服务端返回的数据的key
        },{
            title:'权限名',
            dataIndex:'actionName'
        },{
            title:'备注',
            dataIndex:'remark'
        },{
            title:'操作',
            dataIndex:'del',
            render:(del,row)=>{
                return(
                    <div>
                        <Popconfirm
                        onConfirm={
                            ()=>{
                                this.deletePerIds([row.id])
                            }
                        }
                         okText='确定'
                         cancelText='取消'
                         title='确定要删除吗?'

                        >
                            <Button type="danger">删除</Button>
                        </Popconfirm>
                       
                    </div>
                )
            }
        }]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
            //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            this.setState({
                selectedRowKeys:selectedRowKeys,
                editRow:selectedRows
            })
            }            
          };
        return(
            <div>
                权限管理
                {this.props.total}
                <div>
                <Breadcrumb>
                 <Breadcrumb.Item>
                    <Link to='/home'>首页</Link>
                 </Breadcrumb.Item>
                 <Breadcrumb.Item>
                    <Link to='/home/per_mgr'>权限管理</Link>
                 </Breadcrumb.Item>
              </Breadcrumb>
              <hr/>
              <Button type="primary" style={{margin:'5px'}} onClick={this.hadleAdd}>添加</Button>
              <Button type="primary"  onClick={this.showEdit} style={{margin:'5px'}}>编辑</Button>
              <Button type="danger" onClick={this.handleDelete}  style={{margin:'5px'}}>删除</Button>
              <Input.Search
              placeholder='搜索'
              enterButton
              style={{margin:'5px',width:'300px'}}
              onSearch={this.handleSearch}
              >
              </Input.Search>
              <Table 
               rowKey="id" 
               columns={columns} 
               bordered
              dataSource={this.props.perList} 
               style={{backgroundColor:'#fff'}}
               rowSelection={rowSelection}
                pagination={{pageSize:3,defaultCurrent:1,total:this.props.total,onChange:this.changePage }}   
              />
              <AddPer addPer={this.props.addPer} loadData={this.loadData} visible={this.state.showAddPerDialog} close={this.hideAddPerDialog}></AddPer>
              <EditPer 
              visible={this.state.showEditPerDialog} 
              data={this.state.editRow}
              close={this.hideEditPerDialog}
              submitEditPer={this.props.submitEditPer}
              loadDataAsync={this.props.loadDataAsync}
              params={this.state.params}
              >
               
              </EditPer>
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PerMgr)