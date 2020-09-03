const {Articel,User,Role}=require('./model')
const Sequelize = require('sequelize')
const Op=Sequelize.Op
!(async function(){
//查询一条记录
//  const user1=await User.findOne({
//      attributes: ['userName'],
//      where: {
//          id: 1
//      }
//  })
//  console.log('user1=',user1.dataValues);

// 查询多条记录
//   const articelList=await Articel.findAll({
//        where:{
//       userId:1
//   },
//   order:[
//       ['id','desc']
//   ]
// })
//   console.log('articelList=',articelList.map(articel=>articel.dataValues));

// 分页查询
// const articelList=await Articel.findAll({
//     where:{
//         userId:1
//     },
//   limit:2, // 限制本次查询展示的记录数。
//   offset:2, // 跳过多少条记录
// order:[
//    ['id','desc']
// ]
// })
// console.log('articelList=',articelList.map(articel=>articel.dataValues));
// 查询总数
// const articelCount=await Articel.findAndCountAll({
//     where:{
//         userId:1
//     }
// }  
// );
// console.log('count=',articelCount.count)

// 多条件查询
//   const articelList=await Articel.findAll({
//        where:{
//       userId:1,
//       title:'文章1'
//   }
// })

// const articelList=await Articel.findAll({
//     where:{
//     //   [Op.or]:[{userId:1},{userId:2}]
//     userId:{
//         [Op.or]:[1,2]
//     }
// }
// })

// 操作符使用
// const articelList=await Articel.findAll({
//     where:{
//       id:{
//         //   [Op.gt]:2 // 大于2
//         // [Op.gte]:2 // 大于等于2
//         // [Op.lt]:2  // 小于2
//         //[Op.lte]:2 // 小于等于2
//         // [Op.ne]:2 // 不等于2
//         // [Op.between]:[2,4] // 在2和4之间
//         [Op.notBetween]:[2,4] // 不在2和4之间
//       }
//     }
// })

// 模糊查询
// like '文章%'
// const articelList=await Articel.findAll({
//     where:{
//         title:{
//             [Op.startsWith]:'文章'
//         }
//     }
// })
// like '%标题'
// const articelList=await Articel.findAll({
//     where:{
//         title:{
//             [Op.endsWith]:'标题'
//         }
//     }
// })
//  like %3%

// const articelList=await Articel.findAll({
//     where:{
//         title:{
//             [Op.substring]:'3'
//         }
//     }
// })

// 组合查询
// 查询一下编号大于2，并且文章标题中包含数字3的文章信息。
// const articelList=await Articel.findAll({
//     where:{
//         [Op.and]:[
//             {
//                 id:{
//                     [Op.gt]:2
//                 }
//             },{
//                 title:{
//                     [Op.substring]:'3'
//                 }
//             }
//         ]
//     }
// })
//   console.log('articelList=',articelList.map(articel=>articel.dataValues));


//连接查询
// const articelListWithUser=await Articel.findAll({
//    include:[
//        {
//            model:User
//        }
//    ]
// })

// console.log('articel=',articelListWithUser.map(articel=>{
//     const articelVal=articel.dataValues
//     articelVal.user=articelVal.usertestone.dataValues
//     return articelVal
// }))

//  const UserListWitchArticel=await User.findAll({
//      include:[{
//          model:Articel
//      }]
//  })
// console.log('users=',UserListWitchArticel.map(user=>{
//     const userVal=user.dataValues;
//     userVal.articel=userVal.articelInfoTests.map(articel=>articel.dataValues.title)
//     // console.log('userVal=',userVal);
//     return userVal;
// }))

 //多对多查询
 // 查询出编号为3的用户所有的角色
//  const UserRoleList=await User.findAll({
//      where: {
//          id:3
//      },
//      include:[
//          {
//              model:Role
//          }
//      ]
//  })
//  console.log('userRole=',UserRoleList.map(user=>{
//      const userVal=user.dataValues;
//     //  console.log('userVal=',userVal);
//     userVal.roleInfos=user.roleInfos.map(r=>r.dataValues.roleName);
//    return userVal
//  }))
// 角色编号为1的角色，属于哪些用户？
 const RoleListUser=await Role.findAll({
     where:{
         id:1
     },
     include:[{
         model:User
     }]
 })
 console.log('role=',RoleListUser.map(role=>{
     const roleVal=role.dataValues;
    roleVal.userInfos=role.usertestones.map(r=>r.dataValues.userName);
    return roleVal.userInfos
 }))
})()