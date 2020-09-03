const {User}=require('./model')
!(async function(){
    const delUser=await User.destroy({
        where:{
            id:4
        }
    })
    console.log('delUser=',delUser>0?'删除成功':'删除失败');
})()