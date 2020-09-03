// npm i redis -s
const redis = require('redis')
const client=redis.createClient(6379,'localhost')
client.on('error',function(err){
    console.log(err)
})
client.set('local','shanghai',function(err,result){
    console.log(err)
    console.log(result)
})
// client.get()