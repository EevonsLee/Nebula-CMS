import React, { Component} from 'react';
// import axios from '../../Common/Axios'
import {Layout} from 'antd'
import Top from '../../Components/Top'
import MenuBar from '../../Components/MenuBar'
import {Route,Switch} from 'react-router-dom'
import PerMgr from '../Admin/PerMgr'
import RoleMgr from '../Admin/RoleMgr'
import UserMgr from '../Admin/UserMgr'
import NewCategoryMgr from '../NewCategory'
import AuthRoute from '../../Components/AuthRoute'
import NewInfo from '../NewMgr'
const {Header,Footer,Sider,Content}=Layout
class Home extends Component{
    constructor(props){
        super(props)
        sessionStorage.removeItem('LOGIN_USER_STR')
    }
    // componentDidMount(){
    //     axios.ajaxAxios({
    //         url:'/api/user'
    //     }).then((response)=>{
    //         console.log(response.data)
    //     })
    // }
    render(){
        const {match}=this.props
        return(
           <Layout style={{minHeight:'100vh'}}>
               <Header style={{color:'#fff',padding:'0'}}><Top history={this.props.history}></Top></Header>
               <Layout>
                   <Sider style={{backgroundColor:'#fff'}}>
                       <MenuBar history={this.props.history}></MenuBar>
                   </Sider>
                   <Content>
                    <Switch>
                        <AuthRoute per={1}  path={`${match.path}/user_mgr`} component={UserMgr}></AuthRoute>
                        {/* <Route path={`${match.path}/user_mgr`} component={UserMgr}></Route> */}
                        <AuthRoute per={2} path={`${match.path}/role_mgr`} component={RoleMgr}></AuthRoute>
                        <AuthRoute per={3} path={`${match.path}/per_mgr`} component={PerMgr}></AuthRoute>
                        <Route path={`${match.path}/newcategory_mgr`} component={NewCategoryMgr}></Route>
                        <Route path={`${match.path}/newcontent_mgr`} component={NewInfo}></Route>
                        <Route render={()=><h3>欢迎访问CMS后台管理系统</h3>}></Route>
                    </Switch>
                   </Content>
               </Layout>
               <Footer style={{backgroundColor:'silver'}}>底部区域</Footer>
           </Layout>
        )
    }
}
export default Home;