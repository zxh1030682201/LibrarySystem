import Router from 'koa-router'
import * as bookController from '../controllers/bookController'
const router = new Router({
  prefix: '/book'
})

router.get('/', async (ctx) => {
  ctx.body = await bookController.query(ctx.query)
})

//id查询
router.get('/:_id', async (ctx) => {
  ctx.body = await bookController.findOne(ctx.params)
})

//新增
router.post('/', async (ctx) => {
  ctx.body = await bookController.add(ctx.request.body)
})

//修改,_id为修改的数据的Id
router.put('/:_id', async (ctx) => {
  ctx.body = await bookController.update(ctx.params,ctx.request.body)
})

//删除,_id为修改的数据的Id
router.delete('/:_id', async (ctx) => {
  ctx.body = await bookController.delete(ctx.params)
})


export default router