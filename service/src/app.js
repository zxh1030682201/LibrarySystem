import Koa from 'koa'
import koaBody from 'koa-body'
import router from './middlewares/Router'
import qsJSON from './middlewares/QueryStringJSON'
const logger = require('./middlewares/Logger')
var cors = require('kcors')
const app = new Koa()

// queryString解析中间件
// 将QueryString中JSON字符串解析为Object,默认参数为ctx.query.params
qsJSON(app)

// try-catch 中间件
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    // 系统内自定义异常
    if (err.ercode) {
      ctx.response.body = err
    } else {
      ctx.response.status = 200
      ctx.response.body = {
        status: 200,
        message: err.message,
        isSuccess: false
      }
    }
  }
})

// 日志中间件
app.use(logger.intercept())

// http请求解析中间件
app.use(koaBody({
  multipart: true
}))

// 分页中间件
// app.use(pagination())
app.use(cors({
  credentials: true,
  exposeHeaders: 'Token'
}))

app.use(async (ctx, next) => {
  ctx.params = ctx.request.body.fields
  await next()
})

// 路由中间件
app.use(router.routes(), router.allowedMethods())

module.exports = app
