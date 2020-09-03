import React,{Component} from 'react'
import {Breadcrumb,Table,Button,Input, message, Modal, Popconfirm} from 'antd'
import {Link} from 'react-router-dom'
import service from '../../../Service'
import AddRole from './AddRole'
import EditRole from './EditRole'
import SetRolePer from './SetRolePer'
class RoleMgr extends Component{
    state = {
        params: {
            page:1,
            limit:3,
            q:'',
            sort:'id',
            order:'desc'
        },
        dataSource:[],
        total:0,
        showAddRoleDialog:false,
        showEditRoleDialog:false,
        eidtRow:null,
        showSetRolePerDialog:false,
        setRolePer:null,// 存储了要分配权限的角色完整信息
        selectedRowKeys:[] //存储了要删除的角色编号
    }
    loadData=()=>{
        return service.loadRoleList(this.state.params).then(res=>{
            this.setState({
                dataSource:res.data,
                total:res.totalCount
            })
        })
    }
    changePage=(page,pageSize)=>{
        this.setState(preState=>{
            preState.params.page=page;
            preState.params.limit=pageSize;
            return {...preState}
        },()=>{
            this.loadData();
        })
    }
    handleSearch=(value)=>{
        this.setState(preState=>{
            preState.params.q=value;
            return {...preState}
        },()=>{
            this.loadData()
        })
    }
    handleDelete=()=>{
        if(this.state.selectedRowKeys.length<=0){
            message.warn('请选择要删除的数据')
            return;
        }
        Modal.confirm({
            title:'确定要删除吗?',
            okText:'确定',
            cancelText:'取消',
            onOk:()=>{
                service.deleteRole(this.state.selectedRowKeys).then(res=>{
                    message.info('删除成功!!')
                    this.loadData()
                    this.setState({selectedRowKeys:[]})
                }).catch(err=>{
                    message.error('删除失败')
                })
            }
        })
    }
    closeAddDialog=()=>{
        this.setState({
            showAddRoleDialog:false
        })
    }
    handlAdd=()=>{
        this.setState({
            showAddRoleDialog:true
        })
    }
    //添加角色信息
    addRole=(values)=>{
        service.addRole(values).then(res=>{
            message.info('添加角色成功')
            this.closeAddDialog();
            this.loadData()
        }).catch(err=>{
            console.log(err)
            message.error('角色添加失败')
        })
    }
    // 关闭编辑窗口
    hideEidtRoleDialog=()=>{
        this.setState({
            showEditRoleDialog:false
        })
    }
    // 展示编辑的窗口
    showEdit=()=>{
        if(this.state.selectedRowKeys.length!==1){
            message.warn('编辑数据只能选择1条')
        }else{
            this.setState({
                showEditRoleDialog:true

            })
        }
    }
    //编辑角色数据
    saveRole=(role)=>{
        service.saveRole(role).then(res=>{
            message.info('角色修改成功!')
            this.hideEidtRoleDialog();
            this.loadData()
        }).catch(err=>{
            message.error('角色修改失败');
            console.log(err);

        })
    }
    // 展示出为角色分配权限的窗口
    handleSetRolePer=()=>{
        if(this.state.selectedRowKeys.length!==1){
            message.warn('请选择要分配权限的角色')
        }else{
            let setRole=this.state.dataSource.find(item=>item.id===this.state.selectedRowKeys[0])
            this.setState({
                showSetRolePerDialog:true,
                setRolePer:setRole
            })
        }
    }
    // 定义数据源
    componentDidMount(){
        // const dataSource=[
        //     {
        //         id:1,
        //         roleName:'管理员',      
        //         remark:'管理员角色'
        //     },
        //     {
        //         id:2,
        //         roleName:'讲师',   
        //         remark:'讲师角色'
        //     },
        //     {
        //         id:3,
        //         roleName:'班主任',               
        //          remark:'班主任角色'
        //     }
        // ]
        // this.setState({dataSource})
        this.loadData();
    }
    render(){
        let setRolePerFrm=null;
           // 定义表头
           const columns=[{
            title:'编号', // 表头文本
            dataIndex:'id' // 服务端返回的数据的key
        },{
            title:'角色名',
            dataIndex:'roleName'
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
                            service.deleteRole([row.id]).then(res=>{
                                message.info('删除成功')
                                this.loadData();
                            }).catch(err=>{
                                message.error('删除失败')
                                console.log(err)
                            })
                            }
                        }
                         title='确定要删除该角色吗?'
                         okText='确定'
                         cancelText='取消'
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
            
            //   service.getRoleInfo(selectedRowKeys[0])
              this.setState({selectedRowKeys:selectedRowKeys,eidtRow:selectedRows})
            }            
          };
        return(
            <div>
              <Breadcrumb>
                 <Breadcrumb.Item>
                    <Link to='/home'>首页</Link>
                 </Breadcrumb.Item>
                 <Breadcrumb.Item>
                    <Link to='/home/role_mgr'>角色管理</Link>
                 </Breadcrumb.Item>
              </Breadcrumb>
              <hr/>
              <Button type="primary" style={{margin:'5px'}} onClick={this.handlAdd}>添加</Button>
              <Button type="primary"  style={{margin:'5px'}} onClick={this.showEdit}>编辑</Button>
              <Button type="danger"  style={{margin:'5px'}} onClick={this.handleDelete}>删除</Button>
              <Button type="primary"  style={{margin:'5px'}} onClick={this.handleSetRolePer}>为角色分配权限</Button>
              <Input.Search
              placeholder='搜索'
              enterButton
              style={{margin:'5px',width:'300px'}}
              onSearch={this.handleSearch}
              />
              <Table 
               rowKey="id" 
               columns={columns} 
               bordered
              dataSource={this.state.dataSource} 
               style={{backgroundColor:'#fff'}}
               rowSelection={rowSelection}
                pagination={{pageSize:3,defaultCurrent:1,total:this.state.total,onChange:this.changePage}}   
              />
              <AddRole addRole={this.addRole} visible={this.state.showAddRoleDialog} close={this.closeAddDialog}></AddRole>
              <EditRole saveRole={this.saveRole} data={this.state.eidtRow} visible={this.state.showEditRoleDialog} close={this.hideEidtRoleDialog}></EditRole>
             <Modal
              visible={this.state.showSetRolePerDialog}
              title='为角色分配权限'
              okText='确定'
              cancelText='取消'
              onCancel={()=>this.setState({showSetRolePerDialog: false})}
              onOk={()=>{setRolePerFrm.handleSubmitSetRole()}}
             >
                 {
                     this.state.showSetRolePerDialog?<SetRolePer close={()=>this.setState({showSetRolePerDialog:false})} ref={frm=>setRolePerFrm=frm} data={this.state.setRolePer}></SetRolePer>:null
                 }
                 
             </Modal>
            </div>
        )
    }
}
export default RoleMgr