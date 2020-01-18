const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bookSchema = Schema({
  deleted:{
    type:Boolean,
    default:false
  },
  bookName: String,                   // 书名
  bookType:String,                    //书类型
  author:String,                      //书作者
  publisher:String,                   //书出版社
  publishTime:String,                 //出版时间
  number:Number,                      //剩余数目
  createTime:String,
  updateTime:String
})

var Book = mongoose.model('Book', bookSchema)

module.exports = Book