import { Application, Router } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts'
import getMeal from './routes/getMeal.ts'
import getTimetable from './routes/getTimetable.ts'
import getSchedule from './routes/getSchedule.ts'
import regTodo from './routes/regTodo.ts'

const app = new Application()
const router = new Router()

app
  .use(oakCors({ origin: 'http://localhost:8080' }))
  .use(router.routes())
  .use(router.allowedMethods())

router
  .get('/getTimetable', getTimetable)
  .post('/getMeal', getMeal)
  .post('/getSchedule', getSchedule)
  .post('/regTodo', regTodo)

await app.listen({ port: 5000 })