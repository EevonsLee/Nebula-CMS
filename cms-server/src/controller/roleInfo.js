const {getRoleList,deleteRole,addRole,editRole,getRoleInfo,getAllRoleList}=require('../services/roleInfo')
const roleSearch=require('../model/roleInfoSearch')
async function index(req,res){
    let pageIndex=parseInt(req.query.page)||1
    let pageSize=parseInt(req.query.limit)||3
    let roleName=req.query.q;
    let order=req.query.order;
    let sort=req.query.sort;
    if(roleName===''||typeof(roleName)==='undefined'){
        roleSearch.RoleInfoSearch.roleName=undefined
    }else{
        roleSearch.RoleInfoSearch.roleName=roleName
    }
    roleSearch.RoleInfoSearch.pageIndex=pageIndex
    roleSearch.RoleInfoSearch.pageSize=pageSize
    roleSearch.RoleInfoSearch.order=order
    roleSearch.RoleInfoSearch.sort=sort
    const roleList=await getRoleList(roleSearch.RoleInfoSearch)
    return res.json({
        code:0,
        data:roleList.data,
        totalCount:roleList.count
    })
}
// 删除角色信息
async function roleDeletes(req,res){
    const roleId=parseInt(req.params.id)
    const result= await deleteRole(roleId)
    if(result>0){
        res.json({code:0,data:'删除成功'})
    }else{
        res.json({code:1,data:'删除失败'})
    }
}
// 添加角色信息
async function roleAdd(req,res){
  const roleInfo =await addRole(req.body)
  return res.json({code:0,data:'角色添加成功'})
}
// 编辑角色信息
async function roleEdit(req,res){
    const roleInfo={
        id:parseInt(req.params.id),
        roleName:req.body.roleName,
        remark:req.body.remark,
        delFlag:0,
        createdAt:req.body['0[createdAt]'],
        updatedAt:Date.now()
    }
    const result=await editRole(roleInfo)
    if(result[0]>0){
        return res.json({code:0,data:'更新成功'})
    }else{
        return res.json({code:1,data:'更新失败'})
    }
}
async function roleGet(req, res){
    const roleId=parseInt(req.params.id)
       const result= await getRoleInfo(roleId)
   return res.json({code:0,data:result})
}
// 获取所有的角色数据
async function getAllRoles(req,res){
    const roleList=await getAllRoleList();
    return res.json({code:0,data:roleList});
}
module.exports={
    index,
    roleDeletes,
    roleAdd,
    roleEdit,
    roleGet,
    getAllRoles
}