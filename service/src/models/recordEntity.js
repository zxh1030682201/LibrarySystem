const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = Schema({
  returned:{
    type:Boolean,
    default:false
  },                              //是否已经归还
  bookId:String,                  //书籍ID
  bookName:String,
  userId:String,                  //借书者ID
  userName:String,
  borrowTime:String,              //借书时间
  returnTime:String,              //还书时间
  createTime: String,
  updateTime: String
})

var Record = mongoose.model('Record', recordSchema)

module.exports = Record