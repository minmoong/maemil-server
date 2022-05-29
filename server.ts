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
import getBoard from './routes/board/getBoard.ts'
import regBoard from './routes/board/regBoard.ts'
import removeBoard from './routes/board/removeBoard.ts'
import regComment from './routes/board/regComment.ts'
import removeComment from './routes/board/removeComment.ts'
import getArticle from './routes/board/getArticle.ts'

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
    /* board */
    .post('/api/board/getBoard', getBoard)
    .post('/api/board/regBoard', regBoard)
    .post('/api/board/removeBoard', removeBoard)
    .post('/api/board/regComment', regComment)
    .post('/api/board/removeComment', removeComment)
    .post('/api/board/getArticle', getArticle)

await app.listen({ port: 5000 })