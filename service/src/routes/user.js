import Router from 'koa-router'
import * as userController from '../controllers/userController'
const router = new Router({
  prefix: '/user'
})

router.get('/', async (ctx) => {
  ctx.body = await userController.query(ctx.query)
})

//id查询
router.get('/:_id', async (ctx) => {
  ctx.body = await userController.findOne(ctx.params)
})

//新增
router.post('/', async (ctx) => {
  ctx.body = await userController.add(ctx.request.body)
})

//修改,_id为修改的数据的Id
router.put('/:_id', async (ctx) => {
  ctx.body = await userController.update(ctx.params,ctx.request.body)
})

//删除,_id为修改的数据的Id
router.delete('/:_id', async (ctx) => {
  ctx.body = await userController.delete(ctx.params)
})


export default router
