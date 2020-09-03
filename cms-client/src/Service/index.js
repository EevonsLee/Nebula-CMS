import axios from '../Common/Axios'
export default{
    userLogin(data){
        return axios.ajaxPostAxios({
            url:'/api/userlogin',
            method: 'post',
            data:data
        })
    },
    loadUserList(param){
        return axios.ajaxAxios({
            url:'/api/user',
            data:param
        })
    },
    addUser(data){
        return axios.ajaxPostAxios({
            url:'/api/useradd',
            method:'post',
            data:data
        })
    },
    deleteUser(ids){
        return Promise.all(ids.map(id=>{
            return axios.ajaxDeleteAxios({
                url:'/api/user/'+id
            })
        }))
    },
    editUser(data){
        return axios.ajaxPutAxios({
            url:`/api/useredit/${data[0].id}`,
            method:'put',
            data:data
        })
    },
    loadRoleList(params){
        return axios.ajaxAxios({
            url:'/api/role',
            data:params
        })
    },
    deleteRole(ids){
        return Promise.all(ids.map(id=>axios.ajaxDeleteAxios({
                url:'/api/role/'+id
        })))
    },
    // 添加角色
    addRole(role){
        return axios.ajaxPostAxios({
            url:'/api/role',
            method:'post',
            data:role
        })
    },
    // 编辑角色信息
    saveRole(role){
        return axios.ajaxPutAxios({
            url:`/api/role/${role[0].id}`,
            method:'put',
            data:role
        })
    },
    // 获取要编辑的角色
    getRoleInfo(roleId){
        return axios.ajaxAxios({
            url:'/api/role/'+roleId
        })
    },
    //获取权限数据
    loadPerList(params){
        return axios.ajaxAxios({
            url:'/api/action',
            data: params
        })
    },
// 添加权限信息
addPer(per){
    return axios.ajaxPostAxios({
        url:'/api/action',
        method:'post',
        data:per
    })
},
// 编辑权限信息
editPer(per){
    return axios.ajaxPutAxios({
        url:`/api/action/${per[0].id}`,
        method:'put',
        data:per
    })
},
// 删除权限信息
deletePer(ids){
    return Promise.all(ids.map(id=>axios.ajaxDeleteAxios({
        url:'/api/action/'+id
    })))
},
// 获取所有的角色信息
loadAllRoles(){
    return axios.ajaxAxios({
        url:'/api/roles',
        data:''
    })
},
// 加载具体用户的角色信息
loadUserRoles(userId){
    return axios.ajaxAxios({
        url:'/api/user_role/'+userId
    })
},
//给用户分配角色
addUserRole(userRole){
    return axios.ajaxPostAxios({
        url:'/api/user_role',
        method:'post',
        data:userRole
    })
},
// 删除用户角色
deleteUserRole(id){
    return axios.ajaxDeleteAxios({
        url:'/api/user_role/'+id
    })
},
// 加载所有的权限数据
loadAllPer(){
    return axios.ajaxAxios({
        url:'/api/actions'
    })
},
//为指定的角色加载对应的权限
loadRolePer(roleId){
  return axios.ajaxAxios({
      url:'/api/role_action/'+roleId
  })
},
// 为角色添加对应的权限
addRolePer(rolePer){
    return axios.ajaxPostAxios({
        url:'/api/role_action',
        method:'post',
        data:rolePer
    })
},
//删除角色对应的权限
deleteRolePer(rolePerId){
    return axios.ajaxDeleteAxios({
        url:'/api/role_action/'+rolePerId
    })
},
    // 加载当前用户关联的权限
    loadUserPer(userId){
        return axios.ajaxAxios({
            url:'/api/user_action/'+userId
        })
    },
// 为用户分配权限
    addUserPer(userPer){
        return axios.ajaxPostAxios({
            url:'/api/user_action',
            method: 'post',
            data:userPer
        })
    },
    // 删除用户关联的权限
    deleteUserPer(id){
        return axios.ajaxDeleteAxios({
            url:'/api/user_action/'+id
        })
    },
      // 根据登录用户获取对应的权限。
      getUserAction(userId){
        return axios.ajaxAxios({
            url:'/api/user_action_list/'+userId
        })
    },
  // 获取所有的新闻类别数据
  loadAllNewClass(){
    return axios.ajaxAxios({
        url:'/api/articelClass'
    })
  },
   // 添加新闻类别
   addNewClass(obj){
    return axios.ajaxPostAxios({
        url:'/api/new_class',
        method:'post',
        data:obj
    })
   },
//    添加新闻信息
addNewInfo(obj){
    return axios.ajaxPostAxios({
        url:'/api/new_info',
        method:'post',
        data:obj
    })
},
// 获取新闻内容
loadNewList(params){
    return axios.ajaxAxios({
        url:'/api/new_info',
        data: params
    })
},
    validateCode(code){
        return axios.ajaxAxios({
            url:'/api/checkcode',
            data:code
        })
    }
}