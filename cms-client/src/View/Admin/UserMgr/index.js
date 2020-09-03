import React,{Component} from 'react'
import {Breadcrumb,Table,Button,message, Modal, Popconfirm,Input} from 'antd'
 import service from '../../../Service'
import {Link} from 'react-router-dom'
import { LoadUserActionAsync } from '../../../Action/UserAction'
import store from '../../../store'
import AddUser from './AddUser'
import EditUser from './EditUser'
import SetRole from './SetRole'
import SetPer from './SetPer'
class UserMgr extends Component{
      state={
          params: {page:1,limit:3},
          showAddUserDialog:false,
          showEditUserDialog:false,
          editUserRow:null,// 存储了要编辑的数据
          selectRowKeys:[],
          unsubscribe:null,// 保存了store的订阅
          showSetRoleDialog:false,
          setRoleUser:null, //当前要分配角色的用户信息
       
          showSetPerDialog:false,// 显示设置用户权限的对话框
          setPerUser:null // 当前设置权限的用户

      }
      componentDidMount(){
          // 测试获取登录用户的权限
        service.getUserAction().then(res=>{
            console.log(res.data);
        })
        // service.loadUserList().then(res=>{
        //     this.setState({
        //         dataSource:res.data
        //     })
        // })
        store.dispatch(LoadUserActionAsync(this.state.params))
       const  unsubscribe=store.subscribe(this.userListChange)
       this.setState({
        unsubscribe: unsubscribe
       })
      }
      componentWillUnmount(){
          this.state.unsubscribe&&(this.state.unsubscribe())
      }
      userListChange=()=>{
          const UserList=store.getState().UserList;
          console.log('UserList.list=',UserList.list)
          this.setState({dataSource:UserList.list,total:UserList.total})
      }
      changePage=(page,pageSize,q='')=>{
        //   console.log('page=',page)
        //   console.log('pageSize=',pageSize)
        if(q===''){
            q=this.state.params.q
        }
        this.setState(preState=>{
            return {...preState,...{params:{page:page,limit:pageSize,q}}}
        },()=>{
            store.dispatch(LoadUserActionAsync(this.state.params))
        })
      }

      //关闭添加的窗口
      hideAddUserDialog=()=>{
          this.setState({showAddUserDialog:false})
      }
    //   删除选中数据
    handleDelete=()=>{
        if(this.state.selectRowKeys.length<=0){
            message.warn('请选择要删除的数据!!')
            return;
        }
        Modal.confirm({
            title: '确定要删除数据吗？',
            okText:'删除',
            cancelText:'取消',
            onOk:()=>{
                service.deleteUser(this.state.selectRowKeys).then(res=>{
                    store.dispatch(LoadUserActionAsync(this.state.params));
                    message.success('删除成功!!')
                    this.setState({selectRowKeys:[]})
                }).catch(e=>{
                    message.error('删除失败')
                })
            }
        })

    }
    // 删除单条记录
    deleteUser=(id)=>{
        service.deleteUser([id]).then(res=>{
            store.dispatch(LoadUserActionAsync(this.state.params))
            message.info('删除成功')
            let newSelectRowKeys=this.state.selectRowKeys.filter(item=>item!==id)
            this.setState({selectRowKeys:newSelectRowKeys})
        }).catch(e=>{
            message.error('删除失败')
        })
    }
    // 展示编辑的窗口
    showEdit=()=>{
        if(this.state.selectRowKeys.length!==1){
            message.warn('请选择要编辑的用户，每次选择1条')
        }else{
            this.setState({showEditUserDialog:true})
        }
    }
    //关闭编辑窗口
    hideEditUserDialog=()=>{
        this.setState({showEditUserDialog:false})
    }
    // 关闭角色分配窗口
    hideSetRoleDialog=()=>{
        this.setState({showSetRoleDialog:false})
    }
    // 为用户分配角色
    handleSetRole=()=>{
        if(this.state.selectRowKeys.length!==1){
            message.error('请选择一个用户进行角色分配!')
            return;
        }
        let setRoleUserId=this.state.selectRowKeys[0];
        let setRoleUser=store.getState().UserList.list.find(item=>item.id===setRoleUserId)
        this.setState({
            setRoleUser:setRoleUser,
            showSetRoleDialog:true
        })
    }
    //控制权限设置的窗口
    hideSetPerDialog=()=>{
        this.setState({showSetPerDialog:false})
    }
    // 处理权限
    handleSetPer=()=>{
        if(this.state.selectRowKeys.length!==1){
            message.error('请选择一个用户进行权限分配');
            return
        }
        let setPerUserId=this.state.selectRowKeys[0];
        let setPerUser=store.getState().UserList.list.find(item=>item.id===setPerUserId);
        this.setState({showSetPerDialog:true,setPerUser:setPerUser})
    }
      render(){
          const columns=[
              {
                  title: '编号',
                  dataIndex:'id'
              },
              {
                  title: '用户名',
                  dataIndex:'userName'
              },
              {
                title: '用户密码',
                dataIndex:'password'
            },
            {
                title: '备注',
                dataIndex:'remark'
            },{
                title: '操作',
                dataIndex:'del',
                render:(del,row)=>{
                    return(
                        <div>
                            <Popconfirm
                            onConfirm={()=>{
                                // message.info(row.id)
                                this.deleteUser(row.id)
                            }}
                            okText='确定'
                            cancelText='取消'
                            title='确定要删除吗？'
                            >
                                <Button type="danger">删除</Button>
                            </Popconfirm>
                           
                        </div>
                    )
                }
            }
            
          ]
          const rowSelection={
              onChange:(selectedRowKeys,selectedRows)=>{
                    // console.log('selectedRowKeys=',selectedRowKeys)//索引值
                    // console.log('selectedRows=',selectedRows)//选中的行的数据
                    this.setState({
                        selectRowKeys:selectedRowKeys,
                        editUserRow:selectedRows
                    })
              }
            }
        return(
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to='/'>首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to='/home/user_mgr'>用户管理</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <hr/>
                <Button type="primary" style={{margin:'5px'}} onClick={()=>this.setState({showAddUserDialog:true})}>添加</Button>
              <Button type="primary" style={{margin:'5px'}} onClick={this.showEdit}>编辑</Button>
              <Button type="danger" style={{margin:'5px'}} onClick={this.handleDelete}>删除</Button>
              <Button type="primary" style={{margin:'5px'}}  onClick={this.handleSetRole}>为用户分配角色</Button>
              <Button type="primary" style={{margin:'5px'}}  onClick={this.handleSetPer}>为用户分配权限</Button>
              <Input.Search
              placeholder='搜索'
              enterButton
              style={{margin:'5px',width:'300px'}}
              onSearch={(value)=>{
                  this.setState(preState=>{
                      preState.params.q=value;
                      return {...preState}
                  },()=>{
                      this.changePage(1,3,value)
                  })
              }}
              ></Input.Search>
              <Table 
               rowKey="id" 
               columns={columns} 
               bordered
              dataSource={this.state.dataSource} 
               style={{backgroundColor:'#fff'}}
               rowSelection={rowSelection}
               pagination={{pageSize:3,defaultCurrent:1,onChange:this.changePage,total:this.state.total}}
              />
              <AddUser close={this.hideAddUserDialog} visible={this.state.showAddUserDialog}></AddUser>
              <EditUser data={this.state.editUserRow} params={this.state.params} visible={this.state.showEditUserDialog} close={this.hideEditUserDialog}></EditUser>
              {
                  this.state.showSetRoleDialog?<SetRole
                  visible={this.state.showSetRoleDialog}
                  data={this.state.setRoleUser}
                  close={this.hideSetRoleDialog}
                >
  
                </SetRole>:null
              }
            {
                this.state.showSetPerDialog?<SetPer close={this.hideSetPerDialog}
                 visible={this.state.showSetPerDialog}
                 data={this.state.setPerUser}
                ></SetPer>:null
            }
              
            </div>
        )
    }
}
export default UserMgr