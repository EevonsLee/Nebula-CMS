const {ArticelClass}=require('../db/model/index')
async function getList(){
    const result=await ArticelClass.findAll();
    return result;
}
async function addClass(classInfo){
    return await ArticelClass.create({
        articelType: classInfo.articelType,
        parentId: classInfo.parentId,
        createUserId:classInfo.createUserId,
        remark:classInfo.remark,
        delFlag:0
    })
}
module.exports={
    getList,
    addClass
}
