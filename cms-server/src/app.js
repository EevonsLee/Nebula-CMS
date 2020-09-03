const express=require('express')
const path=require('path')
const captcha=require('svg-captcha')
const jwt=require('jsonwebtoken')
// npm install express-session
// npm install body-parser
const session=require('express-session')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.urlencoded({extended:false}))
app.use('/',express.static(path.join(__dirname,'./public')))
app.use(
  session({
      secret: '这是加密的密钥',
      resave: false,
      saveUninitialized: false
  })
)
app.get('/api/code',function(req,res){
   const cap=captcha.create({
     color:true,
     size:5,// 表示验证码长度
     noise:1,// 干扰线的数量
     ignoreChars: '0oOi1gjdDl', // 验证码字符中排除这些字符串内容
   })
   req.session.captcha=cap.text;
   res.type('svg');
   res.send(cap.data);

})
app.get('/api/checkcode',(req,res)=>{
   if(req.query!==null&&req.session.captcha!==undefined){
    if(req.query[0].toLowerCase()!==req.session.captcha.toLowerCase()){
      return res.json({code:1,msg:'验证码错误'})
    }else{
      return res.json({code:0,msg:'验证码正确'})
    }
   }else{
     return res.json({code:1,msg:'验证码错误'})
   }
})
app.use('/api',(req,res,next)=>{
   if(req.path==='/userlogin'){
     return next();
   }
   jwt.verify(req.get('Authorization'),'my_token',function(err,decode){
      if(err){
        res.status(401).jsonp({
          code:8,
          msg:'用户没有登录，无法访问！'
        })
      }else{
        next();
      }
   })
})
// 导入路由
const userAPIRouter=require('./routes/userInfo')
const roleAPIRouter=require('./routes/roleInfo')
const actionAPIRouter=require('./routes/actionInfo')
const articelClassAPIRouter=require('./routes/articelClass')
const articelInfoAPIRouter=require('./routes/articelInfo')
app.use(userAPIRouter)
app.use(roleAPIRouter)
app.use(actionAPIRouter)
app.use(articelClassAPIRouter);
app.use(articelInfoAPIRouter)
app.listen(8888,function(){
    console.log('server running.....')
})