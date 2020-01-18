// 简单的增删改查使用dbHelper，复杂的操作单独写adminHelper
import assert from 'assert'
const dbHelper = require('../dbhelper/dbHelper')
const adminModel = 'admin'
const userModel = 'user'


exports.login = async (body) => {
  let admin = await dbHelper.findOne(adminModel, {adminName: body.accountname})
  let user= await dbHelper.findOne(userModel, {userName:body.accountname})
  assert((admin||user), '账号不存在！')
  if(admin){
    assert(admin.adminPwd === body.password, 'admin密码不正确！')
    return admin
  }else{
    assert(user.userPwd === body.password, 'user密码不正确！')
    return user
  }
}

