const seq=require('../seq')
const {INTEGER}=require('../types')
const UserRole=seq.define('userrole',{
    id:{
        type:INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    userId:{
        type:INTEGER,
        allowNull:false
    },
    roleId:{
        type:INTEGER,
        allowNull:false
    }
},{
    freezeTableName:true
})
module.exports=UserRole