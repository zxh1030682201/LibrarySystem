import assert from 'assert'
import moment from 'moment'
const dbHelper = require('../dbhelper/dbHelper')
const model = 'book'


exports.query = async (query) => {
  query.params=JSON.parse(query.params)
  if(query.params.bookName){
    let reg=new RegExp(query.params.bookName)
    query.params= {'bookName': reg, deleted:false}
  } 
  query.params.deleted=false
  return dbHelper.query(model, query)
}

exports.findOne = async (query) => {
  return dbHelper.findOne(model, query)
}

exports.add = async (body) => {
  body.createTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  body.updateTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  return dbHelper.add(model, body)
}

exports.update = async (params,body) => {
  body.updateTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  return dbHelper.findOneAndUpdate(model, {_id: params._id}, body)
}

exports.delete = async (body) => {
  const query = {
    _id: body._id,
    deleted: false
  }
  let book = await dbHelper.findOne(model, query)
  assert(book, '用户不存在')
  book.deleted = true
  book.updateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  return dbHelper.findOneAndUpdate(model, body, book)
}