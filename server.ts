import { Application, Router } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts'
import getMeal from './routes/getMeal.ts'
import getTimetable from './routes/getTimetable.ts'
import getSchedule from './routes/getSchedule.ts'
import regTodo from './routes/todo/regTodo.ts'
import removeTodo from './routes/todo/removeTodo.ts'
import getTodo from './routes/todo/getTodo.ts'
import register from './routes/session/register.ts'
import login from './routes/session/login.ts'
import auth from './routes/session/auth.ts'

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
    .post('/api/getMeal', getMeal)
    .get('/api/getTimetable', getTimetable)
    .post('/api/getSchedule', getSchedule)
    /* todo */
    .post('/api/todo/regTodo', regTodo)
    .post('/api/todo/removeTodo', removeTodo)
    .post('/api/todo/getTodo', getTodo)
    /* session */
    .post('/api/session/register', register)
    .post('/api/session/login', login)
    .get('/api/session/auth', auth)

await app.listen({ port: 5000 })