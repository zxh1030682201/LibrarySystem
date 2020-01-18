const mongoose = require('mongoose')
const Schema = mongoose.Schema
const adminSchema = Schema({
  name: String,                   // 姓名
  adminName: String,              // 用户名
  adminPwd: String,               // 密码
})

var Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin