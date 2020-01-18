import assert from 'assert'
import moment from 'moment'
const dbHelper = require('../dbhelper/dbHelper')
const model = 'user'


exports.query = async (query) => {
  query.params=JSON.parse(query.params)
  if(query.params.userName){
    let reg=new RegExp(query.params.userName)
    query.params= {'userName': reg, deleted:false}
  }
  query.params.deleted=false
  return dbHelper.query(model, query)
}


exports.findOne = async (query) => {
  return dbHelper.findOne(model, query)
}

exports.add = async (body) => {
  // 1 验证用户是否存在
  const user_name = await dbHelper.findOne(model, {name: body.name})
  const user_username = await dbHelper.findOne(model, {userName: body.userName})
  assert(!(user_username||user_name), '名字/用户名已存在！')
  body.createTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  body.updateTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  return dbHelper.add(model, body)
}

exports.update = async (params,body) => {
  // 1 验证用户是否存在
  assert(await dbHelper.findOne(model, {_id: params._id,}), '不存在该用户')
  // 2 验证用户名是否重复
  const userByName = await dbHelper.findOne(model, {userName: body.userName})
  const username = await dbHelper.findOne(model, {name: body.name})
  if ((userByName||username) && (userByName._id.toString()||username._id.toString()) !== params._id.toString()) {
    assert(!(userByName||username), '名字/用户名已存在')
  }
  body.updateTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  return dbHelper.findOneAndUpdate(model, {_id: params._id}, body)
}

exports.delete = async (body) => {
  const query = {
    _id: body._id,
    deleted: false
  }
  let user = await dbHelper.findOne(model, query)
  assert(user, '用户不存在')
  user.deleted = true
  user.updateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  return dbHelper.findOneAndUpdate(model, body, user)
}
