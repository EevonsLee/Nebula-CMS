const seq=require('./seq')
require('./model/index')
seq.authenticate().then(()=>{
    console.log('ok')
}).catch(()=>{
    console.log('error')
})
seq.sync({force:false}).then(()=>{
    console.log('sync ok')
    process.exit()
}
 )