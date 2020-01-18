import Router from 'koa-router'
import * as recordController from '../controllers/recordController'
const router = new Router({
  prefix: '/record'
})

router.get('/', async (ctx) => {
  ctx.body = await recordController.query(ctx.query)
})

router.get('/user', async (ctx) => {
  ctx.body = await recordController.query2(ctx.query)
})
//id查询
router.get('/:_id', async (ctx) => {
  ctx.body = await recordController.findOne(ctx.params)
})

//新增
router.post('/', async (ctx) => {
  ctx.body = await recordController.add(ctx.request.body)
})

//修改,_id为修改的数据的Id
router.put('/:_id', async (ctx) => {
  ctx.body = await recordController.update(ctx.params,ctx.request.body)
})

//删除,_id为修改的数据的Id
router.delete('/:_id', async (ctx) => {
  ctx.body = await recordController.delete(ctx.params)
})


export default router