//导入express模块
const express = require('express');
const app = express();
// 1.使用 app.set('view engine','模板引擎的名称')
app.set('view engine', 'ejs');
// 2. 设置模板页面默认的存放路径，app.set('views','模板页面的具体存放路径')
app.set('views', 'ejsViews');
//设置静态资源的访问路径，第一个参数，表示请求的url地址，第二个访问的文件夹。
app.use('/public', express.static('public'));
//导入body-parser模块,处理post过来的数据
const bodyParser = require('body-parser')
    // 注册解析表单数据的bodyParser.
app.use(bodyParser.urlencoded({ extended: false }))
    //  npm install express-session(通过该命令安装session对象)

    // npm install node-uuid
    const uuid = require('node-uuid');
// 使用cookie
var cookieParser = require('cookie-parser');
app.use(cookieParser())
// const session = require('express-session');
// app.use(
//     session({
//         secret: '这是加密的密钥',
//         resave: false,
//         saveUninitialized: false
//     })
// )
const redis= require('redis')
const client=redis.createClient(6379, 'localhost')
client.on('error',function(err){
    console.log(err)
})
app.get('/', function(req, res) {
    res.render('login.ejs');

})
app.post('/userLogin', function(req, res) {
    var userName = req.body.txtUserName;
    var userPwd = req.body.txtUserPwd;
    if (userName === "admin" && userPwd === "123456") {
        // req.session.userName = userName;
        // 根据时间戳和随机数来生成uuid
        let createuuid=uuid.v1();
        client.get(createuuid,userName,function(err,result){
            if(err){
              return  console.log(err);
            }
            res.cookie('sessionId',createuuid);
            res.redirect('/showUserInfo');
        })
      
    }
})
app.get('/showUserInfo', function(req, res) {
    // if (typeof req.session.userName === 'undefined') {
    //     // 如果没有值，跳转到登录页面，让用户登录.
    //     res.redirect('/login');
    // } else {
    //     res.render('showUserInfo.ejs', { userInfoName: req.session.userName });
    // }
    if(typeof req.cookies.sessionId==='undefined'){
        res.redirect('/login');
    }else{
        client.get(req.cookies.sessionId,function(err,result){
            res.render('showUserInfo.ejs',{userInfoName:result})
        })
    }

})
app.listen(3000, function() {
    console.log('server running..........');
})