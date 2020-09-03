import React,{Component} from 'react';
import {Button,Table, message,Popconfirm} from 'antd'
import AddNewInfo from './AddNewInfo'
import Service from '../../Service';
class NewMgr extends Component{
    state={
        params: {
            page:1,
            limit:3,
            q:'',
            sort:'id',
            order:'desc'
        },
        dataSource:[],
        total:0,
        showAddNewDialog:false

    }
    loadData=()=>{
        return Service.loadNewList(this.state.params).then(res=>{
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
    componentDidMount(){
        this.loadData();
    }
    //显示窗口
    handleAdd=(id)=>{
        this.setState({showAddNewDialog:true})
    }
    // 关闭窗口
    closeAddDialog=()=>{
        this.setState({showAddNewDialog:false})
    }
    // 实现添加
    addNewInfo=(data)=>{
        Service.addNewInfo(data).then(res=>{
            message.info('新闻信息添加成功');
            this.closeAddDialog();
        }).catch(err=>{
            console.log(err)
            message.error('新闻信息添加失败')
        })
    }
    render(){
         // 定义表头
         const columns=[{
            title:'编号', // 表头文本
            dataIndex:'id' // 服务端返回的数据的key
        },{
            title:'标题',
            dataIndex:'title'
        },
        
        {
            title:'作者',
            dataIndex:'author'
        },
        {
            title:'来源',
            dataIndex:'origin'
        },
        {
            title:'图片',
            dataIndex:'photoUrl',
            render(photoUrl){
                return <img with='100' height='100' src={photoUrl} alt=''/>;
            }
        }
        ,{
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
                            Service.deleteNew([row.id]).then(res=>{
                                message.info('删除成功')
                                this.loadData();
                            }).catch(err=>{
                                message.error('删除失败')
                                console.log(err)
                            })
                            }
                        }
                         title='确定要删除该新闻内容吗?'
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
                <Button type="primary" onClick={this.handleAdd}>添加新闻</Button>
                <Table 
               rowKey="id" 
               columns={columns} 
               bordered
              dataSource={this.state.dataSource} 
               style={{backgroundColor:'#fff'}}
               rowSelection={rowSelection}
                pagination={{pageSize:3,defaultCurrent:1,total:this.state.total,onChange:this.changePage}}   
              />
                <AddNewInfo
              close={this.closeAddDialog} 
              visible={this.state.showAddNewDialog}
              addNewInfo={this.addNewInfo}
              ></AddNewInfo>
            </div>
        )
    }
}
export default NewMgr