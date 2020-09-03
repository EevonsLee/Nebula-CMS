const {User}=require('./model')
!(async function(){
    const updateData=await User.update({
        passWord:'666'
    },{
        where:{
            id:3
        }
    })
    console.log('updateData=',updateData[0]>0?'修改成功':'修改失败');
})()