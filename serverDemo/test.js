const express=require('express');
const mysql=require('mysql');
const app=express();
const conn=mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'123456',
    database: 'test'
})
// app.get('/',function(req,res){
//     // nodemon: npm i nodemon -g
//     // const sql="select * from user"
//     // ?表示的是占位符
//     const sql="insert into user (name,pass_word) values(?,?) "
//     let name='laowang666'
//     let pwd='123'
//     conn.query(sql,[name,pwd],function(err,result){
//         if(err) return console.log(err.message);
//         console.log(result)
//     })
//     res.send('hello world');
// })

// app.get('/',function(req,res){
//    const sql="update user set pass_word=? where id=?"
//    let id=7
//    let pwd='888';
//     conn.query(sql,[pwd,id],function(err,result){
//         if(err) return console.log(err.message);
//         console.log(result)
//     })
//     res.send('hello world');
// })

app.get('/',function(req,res){
    const sql="delete from user where id=?"
    let id=7
     conn.query(sql,id,function(err,result){
         if(err) return console.log(err.message);
         console.log(result)
     })
     res.send('hello world');
 })
app.listen(8888,function(){
    console.log('server running.....')
})