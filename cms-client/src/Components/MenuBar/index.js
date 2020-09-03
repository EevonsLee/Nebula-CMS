import React,{Component} from 'react';
import {Menu} from 'antd'
import {getLoginUserAllPer} from '../../Common/Auth'
// import Service from '../../Service';
const {SubMenu} =Menu
class MenuBar extends Component{
    state={
        current:'user_mgr',
        perMenu:[] // 当前登录用户所具有的菜单类型的权限
    }
    componentDidMount(){
        // Service.getUserAction(GetLoginUserInfo().id).then(res=>{
        //     this.setState({
        //         perMenu:res.data.filter(m=>m.actionType==='menu')
        //     })
        // })
        getLoginUserAllPer().then(res=>{
            this.setState({
                perMenu:res.filter(m=>m.actionType==='menu')
            })
        })
    }
    handleMenuClick=e=>{
        this.setState({current:e.key})
        // this.props.history.push(`/home/${e.key}`)
        let url=this.state.perMenu.find(item=>item.id===parseInt(e.key)).actionUrl;
        this.props.history.push(url);
    }
   render(){
       // 获取一级菜单
      let rootMenu=this.state.perMenu.filter(m=>m.pId===0);
        return(
            <div>
               <Menu
                 onClick={this.handleMenuClick}
                //  selectedKeys={[this.state.current]}
                 mode="inline"
               >
                   {
                       rootMenu.map(rootM=>{
                           //获取对应的子菜单。
                           let childMenus=this.state.perMenu.filter(m=>m.pId===rootM.id);
                           return (
                            <SubMenu key={rootM.id} title={
                                <span>
                                    {rootM.actionName}
                                </span>
                            }>
                                {
                                    childMenus.map(childM=>{
                                        return(
                                        <Menu.Item key={childM.id}>{childM.actionName}</Menu.Item>
                                        )
                                    })
                                }
                              
                               
                          </SubMenu>
                           )
                       })
                   }
{/* 
                   <SubMenu title="后台管理">
                       <Menu.Item key="user_mgr">用户管理</Menu.Item>
                       <Menu.Item key="role_mgr">角色管理</Menu.Item>
                       <Menu.Item key="per_mgr">权限管理</Menu.Item>
                   </SubMenu>
                   <SubMenu title='新闻管理'>
                       <Menu.Item key="new_mgr">新闻内容管理</Menu.Item>
                       <Menu.Item key="category_mgr">新闻类别管理</Menu.Item>
                   </SubMenu> */}
               </Menu>
            </div>
        )
    }
}
export default MenuBar