const actionSearch=require('../model/actionInfoSearch')
const {getActionList,addAction,editAction,deleteAction,getAllActionList,loadRoleActions,addRoleAction,deleteRoleAction}=require('../services/actionInfo')

async function index(req,res){
    let pageIndex=parseInt(req.query.page)||1;
    let pageSize=parseInt(req.query.limit)||3;
    let actionName=req.query.q;
    if(actionName===''||typeof(actionName)==='undefined'){
        actionSearch.ActionInfoSearch.actionName=undefined;
    }else{
        actionSearch.ActionInfoSearch.actionName=actionName
    }
    actionSearch.ActionInfoSearch.pageIndex=pageIndex,
    actionSearch.ActionInfoSearch.pageSize=pageSize;
    actionSearch.ActionInfoSearch.order=req.query.order;
    actionSearch.ActionInfoSearch.sort=req.query.sort
    const actionList=await getActionList(actionSearch.ActionInfoSearch)
    return res.json({
        code:0,
        data:actionList.data,
        count:actionList.count
    })
}
// 添加权限信息
async function actionAdd(req,res){
   const actionInfo=await addAction(req.body)
   return res.json({
       code:0,
       data:actionInfo
   })
}
// 编辑权限信息
async function actionEdit(req,res) {
    const actionInfo ={
        id:parseInt(req.params.id),
        actionName:req.body.actionName,
        actionType:req.body.actionType,
        actionSubby:req.body.actionSubby,
        actionCode:req.body.actionCode,
        actionUrl:req.body.actionUrl,
        pId:parseInt(req.body.pId),
        remark:req.body.remark,
        delFlag:0,
        createdAt:req.body['0[createdAt]'],
        updatedAt:Date.now()
    }
   const result= await editAction(actionInfo);
   if(result[0]>0){
        return res.json({
            code:0,
            data:actionInfo
        })
   }else{
      return res.json({
          code:1,
          data:'权限更新失败'
      })
   }
}
// 删除权限信息操作
async function actionDelete(req,res){
    const actionId=parseInt(req.params.id);
   const result=await deleteAction(actionId);
   if(result>0){
       return res.json({
           code:0,
           data:'删除成功'
       })
   }else{
    return res.json({
        code:1,
        data:'删除失败'
    })
   }

}
// 加载所有权限
async function getAllActions(req,res){
   const result= await getAllActionList()
   return res.json({code:0,data:result})
}
// 获取指定角色对应的权限数据
async function getRoleActions(req,res){
    const roleId=parseInt(req.params.id)
   const result= await loadRoleActions(roleId);
   return res.json({
       code:0,
       data:result
   })
}
// 为角色添加权限
async function addRoleActions(req,res) {
   const roleAction= await addRoleAction(req.body)
   return res.json({
       code:0,
       data:'添加成功'
   })
}
// 删除角色对应的权限
async function deleteRoleActions(req,res){
    const roleActionId=parseInt(req.params.id);
   const result= await deleteRoleAction(roleActionId);
   if(result>0){
    return res.json({
        code:0,
        data:'删除成功'
    })
   }else{
    return res.json({
        code:1,
        data:'删除失败'
    })
   }
}

module.exports={
    index,
    actionAdd,
    actionEdit,
    actionDelete,
    getAllActions,
    getRoleActions,
    addRoleActions,
    deleteRoleActions
    
     
}