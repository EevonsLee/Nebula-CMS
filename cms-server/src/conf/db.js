const {isProd}=require('../utils/env')
let REDIS_CONF={
    prot:6379,
    host:'127.0.0.1'
}
let MYSQL_CONF={
    host:'localhost',
    user:'root',
    password:'123456',
    prot:'3306',
    database:'bxgcms'
}
if(isProd){
     REDIS_CONF={
        prot:6379,
        host:'127.0.0.1'
    }
    MYSQL_CONF={
       host:'localhost',
    user:'root',
    password:'123456',
    prot:'3306',
    database:'bxgcms'
    }
}
module.exports={
    MYSQL_CONF,
    REDIS_CONF
}