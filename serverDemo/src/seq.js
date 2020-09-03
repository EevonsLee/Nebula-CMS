const Sequelize=require('sequelize')
// 第一个参数：数据库的名称
// 第二个参数：登录数据库的用户名。
// 第三个参数：登录数据库的密码
// 第四个参数：指定数据库服务器地址，同时指定操作数据库的类型。
const conf={
    host:'localhost',
    dialect:'mysql'
}
conf.pool={
    max:5,// 连接池中最大的连接数。
    min:0,// 最小的连接数.
    idle:10000//如果一个连接池10秒只能没有被使用，则被释放。 
}
const seq=new Sequelize('itcasttest','root','123456',conf)
seq.authenticate().then(()=>{
    console.log('ok')
}).catch(()=>{
    console.log('error')
})
module.exports=seq
