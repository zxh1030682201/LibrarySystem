const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = Schema({
  deleted:{
    type:Boolean,
    default:false
  },
  name: String,                    // 姓名
  userName: String,                //用户名
  userPwd: String,                 //密码
  tel:String,
  email:String,
  records:[{
    type: Schema.Types.ObjectId, ref: 'Record'
  }],                   //已借记录
  balance:{
    type:Number,
    default: 5
  },//账户余额
  createTime: String,
  updateTime: String
})

var User = mongoose.model('User', userSchema)

module.exports = User