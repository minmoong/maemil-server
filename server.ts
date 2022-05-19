import { Application, Router } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts'
import getMeal from './routes/getMeal.ts'
import getTimetable from './routes/getTimetable.ts'
import getSchedule from './routes/getSchedule.ts'
import regTodo from './routes/Todo/regTodo.ts'
import removeTodo from './routes/Todo/removeTodo.ts'
import register from './routes/register.ts'
import login from './routes/login.ts'

const app = new Application()
const router = new Router()

app
  .use(oakCors({
    origin: 'http://localhost:8080',
    credentials: true
  }))
  .use(router.routes())
  .use(router.allowedMethods())

router
  .get('/getTimetable', getTimetable)
  .post('/getMeal', getMeal)
  .post('/getSchedule', getSchedule)
  .post('/regTodo', regTodo)
  .post('/removeTodo', removeTodo)
  .post('/register', register)
  .post('/login', login)

await app.listen({ port: 5000 })