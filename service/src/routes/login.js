import Router from 'koa-router'
import * as loginController from '../controllers/loginController'
const router = new Router({
  prefix: '/login'
})

router.post('/', async (ctx) => {
  ctx.body=await loginController.login(ctx.request.body)
})


export default router