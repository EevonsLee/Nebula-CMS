const {Articel,User,Role,UserRole}=require('./model')
!(async function(){
    const user1=await User.create({
        userName:'zhangsan',
        passWord:'123'
    })
    console.log('user1',user1.dataValues)
    const user2=await User.create({
        userName:'lisi',
        passWord:'123456'
    })
    const role1=await Role.create({
        roleName:'老师',
        roleRemark:'老师的角色'
    })
    const role2=await Role.create({
        roleName:'班主任',
        roleRemark:'班主任的角色'
    })
   await UserRole.bulkCreate([
       {userId:user1.dataValues.id,roleId:role1.dataValues.id},
       {userId:user1.dataValues.id,roleId:role2.dataValues.id},
       {userId:user2.dataValues.id,roleId:role1.dataValues.id},
   ])


//    await UserRole.create({
//        userId:user1.dataValues.id,
//        roleId:role1.dataValues.id
//    })
//    await UserRole.create({
//     userId:user1.dataValues.id,
//     roleId:role2.dataValues.id
// })
//    const article1=await Articel.create({
//        title:'文章1',
//        content:'内容1',
//        userId:user1.dataValues.id
//    })
//    const article2=await Articel.create({
//     title:'文章2',
//     content:'内容2',
//     userId:user2.dataValues.id
// })
})()