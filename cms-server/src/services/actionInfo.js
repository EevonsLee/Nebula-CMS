const {Action,RoleAction}=require('../db/model/index')
const Sequelize = require('sequelize')
const Op=Sequelize.Op
async function getActionList(actionInfoSearch){
    if(typeof(actionInfoSearch.actionName)!=='undefined'){
        const actionCount=await Action.findAndCountAll({
            where:{
                actionName:{
                    [Op.substring]:actionInfoSearch.actionName
                }
            }
        }           
        )
        const result=await Action.findAll({
            where:{
                actionName:{
                    [Op.substring]:actionInfoSearch.actionName
                }
            },
            order:[
                [actionInfoSearch.sort,actionInfoSearch.order]
            ],
            limit:actionInfoSearch.pageSize,
            offset:(actionInfoSearch.pageIndex-1)*actionInfoSearch.pageSize
        })
        return {data:result,count:actionCount.count}

    }else{
        const actionCount=await Action.findAndCountAll()
        const result=await Action.findAll({
            order:[
                [actionInfoSearch.sort,actionInfoSearch.order]
            ],
            limit:actionInfoSearch.pageSize,
            offset:(actionInfoSearch.pageIndex-1)*actionInfoSearch.pageSize
        })
        return {data:result,count:actionCount.count}
    }

}
// 添加权限数据
async function addAction(action){
    return await Action.create({
        actionName:action.actionName,
        actionType:action.actionType,
        actionSubby:action.actionSubby,
        actionCode:action.actionCode,
        actionUrl:action.actionUrl,
        pId:action.pId,
        remark:action.remark,
        delFlag:action.delFlag
    })
}
// 完成权限信息的编辑
async function editAction(data){
    return await Action.update({
        actionName:data.actionName,
        actionType:data.actionType,
        actionSubby:data.actionSubby,
        actionCode:data.actionCode,
        actionUrl:data.actionUrl,
        pId:data.pId,
        remark:data.remark,
        delFlag:data.delFlag,
        createdAt:data.createdAt,
        updatedAt:data.updatedAt
    },{
        where:{
            id:data.id
        }
    })
}
// 删除权限信息
async function deleteAction(actionId){
    return await Action.destroy({
        where:{
            id:actionId
        }
    })
}
// 加载所有权限
async function getAllActionList(){
   const result = await Action.findAll();
   return result;
}
// 加载指定角色具有的权限数据
async function loadRoleActions(roleId){
    return RoleAction.findAll({
        attributes:['id','actionId'],
        where:{
            roleId: roleId
        }
    })
}
// 为角色添加权限
async function addRoleAction(data){
    return await RoleAction.create({
        actionId:data.actionId,
        roleId:data.roleId
    })
}
// 删除角色对应的权限
async function deleteRoleAction(roleActionId){
   return await RoleAction.destroy({
       where:{
           id:roleActionId
       }
   })
}
// 获取指定的角色对应的权限编号
async function loadRoleActionIds(roleIds){
    return await RoleAction.findAll({ 
        attributes:['actionId'], 
        where:{ 
            roleId:{
                [Op.in]:roleIds
            }
        }
    })
}
// 根据权限编号，查询出具体的权限数据
async function getActionByIds(actionIds){
    return await Action.findAll({
        where:{
            id:{
                [Op.in]:actionIds
            }
        }
    })
}
module.exports ={
    getActionList,
    addAction,
    editAction,
    deleteAction,
    getAllActionList,
    loadRoleActions,
    addRoleAction,
    deleteRoleAction,
    loadRoleActionIds,
    getActionByIds
  
}