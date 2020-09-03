const {User,UserRole,UserAction}=require('../db/model/index')
const Sequelize=require('sequelize')
const Op=Sequelize.Op
async function getUserList(userInfoSearch){
     if(typeof(userInfoSearch.userName)!=='undefined'){
        const userCount=await User.findAndCountAll({
            where:{
                userName:{
                    [Op.substring]:userInfoSearch.userName
                }
            }
        })
        const result=await User.findAll({
            where:{
                userName:{
                    [Op.substring]:userInfoSearch.userName
                }
            },
            limit:userInfoSearch.pageSize,
            offset:(userInfoSearch.pageIndex-1)*userInfoSearch.pageSize
        })
        return {data:result,count:userCount.count}
     }else{
        const userCount=await User.findAndCountAll()
        const result=await User.findAll({
            limit:userInfoSearch.pageSize,
            offset:(userInfoSearch.pageIndex-1)*userInfoSearch.pageSize
        });
        return {data:result,count:userCount.count}
     }
           
}
async function getUserLoginInfo(data){
    const userInfo=User.findOne({
        where:{
            userName:data.userName,
            password:data.userPwd
        }
    })
    return userInfo
}
// 完成用户的数据保存
async function addUser(data){
    return await User.create({
        userName:data.userName,
        password:data.userPwd,
        remark:data.remark,
        delFlag:0

    })
}
// 删除用户数据
async function deleteUser(userId){
   return await User.destroy({
       where:{
           id:userId
       }
   })
}
// 更新用户数据
async function editUser(data){
    return await User.update({
        userName:data.userName,
        password:data.password,
        remark:data.remark,
        delFlag:data.delFlag,
        createAt:data.createAt,
        updateAt:data.updateAt
    },{
        where:{
            id:data.id
        }
    })
}
// 获取用户已经具有的角色数据
async function loadUserRole(userId) {
    return UserRole.findAll({
        attributes: ['id','roleId'],
        where: {
            userId:userId
        }
    })
}
async function addUserRole(data){
    return await UserRole.create({
        userId:data.userId,
        roleId:data.roleId
    })
}
async function deleteUserRole(id){
    return await UserRole.destroy({
        where:{
            id:id
        }
    })
}
// 根据用户编号查询该用户具有的权限
async function loadUserAction(userId){
    return UserAction.findAll({ 
        attributes: ['id','actionId'], 
        where:{
            userId:userId
        }
    })
}
// 添加权限
async function addUserAction(data){
    return UserAction.create({
        userId: data.userId,
        actionId:data.actionId,
        delFlag:data.delFlag
    })
}
// 删除权限
async function deleteUserAction(id){
  return await UserAction.destroy({
      where:{
          id: id
      }
  })
}
module.exports={
    getUserList,
    getUserLoginInfo,
    addUser,
    deleteUser,
    editUser,
    loadUserRole,
    addUserRole,
    deleteUserRole,
    loadUserAction,
    addUserAction,
    deleteUserAction
}