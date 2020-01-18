import assert from 'assert'
import moment from 'moment'
const dbHelper = require('../dbhelper/dbHelper')
const model = 'record'


exports.query = async (query) => {
  query.params=JSON.parse(query.params)
  if(query.params.name){
    let reg = new RegExp(query.params.name)
    delete query.params.name
    query.params['$or']= [{'bookName': reg},{'userName':reg}]
  }
  return dbHelper.query(model, query)
}

exports.query2 = async (query) => {
  query.params=JSON.parse(query.params)
  if(query.params.name){
    let reg = new RegExp(query.params.book)
    query.params= {'userName':query.params.name}
    query.params['$or']= [{'bookName': reg}]
    delete query.params.book
    delete query.params.name
  }
  return dbHelper.query(model, query)
}

exports.findOne = async (query) => {
  return dbHelper.findOne(model, query)
}

exports.add = async (body) => {
  let book=await dbHelper.findOne('book',{_id:body.bookId})
  let user=await dbHelper.findOne('user',{name:body.userName})
  assert(user, '用户不存在')
  assert(book,'书籍不存在')
  body.userId=user._id
  body.borrowTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  body.returnTime=moment(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss')
  body.createTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  body.updateTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  //如果书籍数量和余额都足够
  assert((book.number >= 1 && user.balance >= 1),'书籍数量不足或余额不足')
  let record =await dbHelper.add(model, body)
  book.number=book.number-1
  user.balance=user.balance-1
  user.records.push(record._id)
  await dbHelper.findOneAndUpdate('book', {_id: book._id}, book)
  await dbHelper.findOneAndUpdate('user', {_id: user._id}, user)
  return record
}

exports.update = async (params,body) => {
  body.updateTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  return dbHelper.findOneAndUpdate(model, {_id: params._id}, body)
}

exports.delete = async (body) => {
  const query = {
    _id: body._id,
    returned: false
  }
  let record = await dbHelper.findOne(model, query)
  assert(record, '记录不存在')
  record.returned = true
  record.updateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  let user=await dbHelper.findOne('user',{_id:record.userId})
  let book=await dbHelper.findOne('book',{_id:record.bookId})
  book.number=book.number+1
  user.balance=user.balance+1
  await dbHelper.findOneAndUpdate('book', {_id: book._id}, book)
  await dbHelper.findOneAndUpdate('user', {_id: user._id}, user)
  return dbHelper.findOneAndUpdate(model, body, record)
}