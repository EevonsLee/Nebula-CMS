const {getUserList,getUserLoginInfo,addUser,deleteUser,editUser,loadUserRole,addUserRole,deleteUserRole,loadUserAction,addUserAction,deleteUserAction}=require('../services/userInfo')
const {loadRoleActionIds,getActionByIds}=require('../services/actionInfo')
const userSearch=require('../model/userInfoSearch')
const jwt=require('jsonwebtoken')
// exports.index=(req,res)=>{
//     res.send('用户信息展示')
// }
async function index(req,res){
    let pageIndex=parseInt(req.query.page)||1;
    let pageSize=parseInt(req.query.pageSize)||3;
    let userName=req.query.q;
    if(userName===''||typeof(userName)==='undefined'){
        userSearch.UserInfoSearch.userName=undefined;
    }else{
        userSearch.UserInfoSearch.userName=userName;
    }
    userSearch.UserInfoSearch.pageIndex=pageIndex
    userSearch.UserInfoSearch.pageSize=pageSize
//    const userList= await getUserList(pageIndex,pageSize);
const userList= await getUserList(userSearch.UserInfoSearch);
   return res.json({code:0,data:userList.data,count:userList.count})
}
async function userlogin(req,res){
    if(req.body.userCode===''){
        return res.json({code:1,msg:'验证码错误'})
    }
    if(req.session.captcha===undefined){
        return res.json({code:1,msg:'验证码错误'})
    }
    if(req.body.userCode.toLowerCase()!==req.session.captcha.toLowerCase()){
        return res.json({code:1,msg:'验证码错误'})
    }

   const userInfo=await getUserLoginInfo(req.body);
   if(userInfo!=null){
    const token=jwt.sign({
        name:userInfo.userName,
        date:Date.now()
    },'my_token')
       return res.json({code:0,data:userInfo,msg:'登录成功',myToken:token})
   }
   return res.json({code:1,msg:'用户登录失败'})
}
// 添加用户信息
async function useradd(req,res){
  const userInfo=await addUser(req.body)
  return res.json({code:0,data:userInfo.dataValues})
}
// 删除用户数据
async function userDeletes(req,res){
  const userId=parseInt(req.params.id);
  const result=await deleteUser(userId);
  if(result>0){
      return res.json({code:0,data:'删除成功'})
  }else{
    return res.json({code:1,data:'删除失败'})
  }
}
// 完成用户编辑操作
async function userEdit(req,res){
    const userInfo={
        id:parseInt(req.params.id),
        userName:req.body.userName,
        password:req.body.userPwd,
        remark:req.body.remark,
        delFlag:0,
        createAt:req.body['0[createAt]'],
        updateAt:Date.now()
    }
   const result=await editUser(userInfo)
   if(result[0]>0){
       return res.json({code:0,data:userInfo})
   }else{
       return res.json({code:1,data:'更新失败'})
   }
}
// 获取用户对应的角色数据
async function getUserRole(req,res){
    const userId=parseInt(req.params.id);
    const result=await loadUserRole(userId);
    return res.json({code:0,data:result});
}
async function userAddRole(req,res) {
   const userRole= await addUserRole(req.body);
   return res.json({code:0,data:'添加成功'});
}
async function userDeleteRole(req,res){
    const id=parseInt(req.params.id)
    const result=await deleteUserRole(id);
    if(result>0){
        return res.json({code:0,data:'删除成功'})
    }else{
        return res.json({code:1,data:'删除失败'})
    }
}
// 根据用户编号，获取用户具有的权限数据
async function getUserAction(req,res){
    const userId=parseInt(req.params.id);
   const result= await loadUserAction(userId);
   return res.json({
       code:0,
       data:result
   })
}
// 为用户添加对应的权限
async function userAddAction(req,res){
  const userAction=await addUserAction(req.body);
  return res.json({
      code:0,
      data:'添加成功'
  })
}
// 删除用户对应的权限
async function userDeleteAction(req,res){
    const id=parseInt(req.params.id);
   const result= await deleteUserAction(id);
   if(result>0){
       return res.json({code:0,data:'删除成功'})
   }else{
    return res.json({code:1,data:'删除失败'})
   }
}
async function findUserRoleActions(userRoles){
    let userRoleIds=[];
    userRoles.map(userRole=>{
        userRoleIds.push(userRole.dataValues.roleId)
    })
    //    根据角色编号，查询对应的权限
    let actionIds=[];
    let actionDetails=[]
    let roleActions=await loadRoleActionIds(userRoleIds);
    roleActions.map(roleaction=>{
        actionIds.push(roleaction.dataValues.actionId);
    })
    //每个角色可能有很多的权限，对应的可能会出现重复，所以需要去重.
    let newArr=[...new Set(actionIds)]
    // 根据权限的编号，查询出具体的权限数据.
    let actionInfos=await getActionByIds(newArr);
    actionInfos.map(actionInfo=>{
        actionDetails.push(actionInfo.dataValues)
    })
    return actionDetails;
}
async function getUserActionList(req,res){
    // 根据用户--角色--权限来查询登录用户的权限信息。
    const userId=parseInt(req.params.id);
    // 根据登录用户，获取对应的角色.
   let userRoles=await loadUserRole(userId)
//    根据角色编号，查询对应的权限
   let userActions=await findUserRoleActions(userRoles)
   // 用户--权限 来查询登录用户的权限数据。
   let userPers=await loadUserAction(userId);
   let actionIds=[];
   let actionDetails=[];
   userPers.map(useraction=>{
    actionIds.push(useraction.dataValues.actionId)
   })
   // 根据权限编号，查询出具体的权限数据
  let actionInfos= await getActionByIds(actionIds);
  actionInfos.map(actionInfo=>{
    actionDetails.push(actionInfo.dataValues)
  })
  // 将两组权限数据进行合并操作
  userActions=[...userActions,...actionDetails];
  // 进行去重操作。
  let result=userActions.filter((x,index,self)=>{
      let arrs=[];
      userActions.forEach((item,i)=>{
          arrs.push(item.id)
      })
      return arrs.indexOf(x.id)===index;
  })
  return res.json({
      code:0,
      data:result
  })
}
module.exports={
    index,
    userlogin,
    useradd,
    userDeletes,
    userEdit,
    getUserRole,
    userAddRole,
    userDeleteRole,
    getUserAction,
    userAddAction,
    userDeleteAction,
    getUserActionList
}