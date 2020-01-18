import * as user from './system/user'
import * as record from './system/record'
import * as book from './system/book'

export default {
  // 用户
  user_query: user.query,
  user_add: user.add,
  user_update: user.update,
  user_delete: user.deleteR,
  user_login: user.login,
  // 记录
  record_query: record.query,
  record_queryUser: record.queryUser,
  record_add: record.add,
  record_update: record.update,
  record_delete: record.deleteR,
  // 书籍
  book_query: book.query,
  book_add: book.add,
  book_update: book.update,
  book_delete: book.deleteR
}
