const {Role}=require('../db/model/index')
const Sequelize = require('sequelize')
const Op=Sequelize.Op
async function getRoleList(roleInfoSearch){
    if(typeof(roleInfoSearch.roleName)!=='undefined'){
        const roleCount=await Role.findAndCountAll({
            where:{
                roleName:{
                    [Op.substring]:roleInfoSearch.roleName
                }
            }
        })
        const result=await Role.findAll({
            where:{
                roleName:{
                    [Op.substring]:roleInfoSearch.roleName
                }
            },
            order:[
                [roleInfoSearch.sort,roleInfoSearch.order]
            ],
            limit:roleInfoSearch.pageSize,
            offset:(roleInfoSearch.pageIndex-1)*roleInfoSearch.pageSize
        })
        return {data:result,count:roleCount.count}
    }else{
        const roleCount=await Role.findAndCountAll()
        const result=await Role.findAll({
            order:[
                [roleInfoSearch.sort,roleInfoSearch.order]
            ],
            limit:roleInfoSearch.pageSize,
            offset:(roleInfoSearch.pageIndex-1)*roleInfoSearch.pageSize
        })
        return {data:result,count:roleCount.count}
    }
}
async function deleteRole(roleId){
    return await Role.destroy({
        where:{
            id:roleId
        }
    })
}
// 添加角色信息
async function  addRole(role){
    return await Role.create({
        roleName:role.roleName,
        remark:role.remark,
        delFlag:0
    })
}
//编辑角色信息
async function editRole(roleInfo){
    return await Role.update({
        roleName:roleInfo.roleName,
        remark:roleInfo.remark,
        delFlag:roleInfo.delFlag,
        createdAt:roleInfo.createdAt,
        updatedAt:roleInfo.updatedAt
    },{
        where:{
            id:roleInfo.id
        }
    })
}
async function getRoleInfo(roleId){
    return await Role.findOne({
        where:{
            id:roleId
        }
    })
}
// 获取所有的角色数据
async function getAllRoleList(){
   const result= await Role.findAll();
   return result
}
module.exports={
    getRoleList,
    deleteRole,
    addRole,
    editRole,
    getRoleInfo,
    getAllRoleList
}