import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import client from '../../db/client.ts'

async function regTodo(ctx: RouterContext<'/api/todo/regTodo'>) {
    const { grd, grp, todoId, desc } = await ctx.request.body().value

    try {
        const result = (await client.execute(
            'SELECT todos FROM todos WHERE grd=? AND grp=?',
            [grd, grp]
        )).rows

        if((result as any)[0]?.todos === undefined) {
            const todos = JSON.stringify([{ todoId, desc }])

            await client.execute(
                'INSERT INTO todos (grd, grp, todos) VALUES (?, ?, ?)',
                [grd, grp, todos]
            )
        } else {
            let todos = JSON.parse((result as any)[0].todos)
            todos.push({ todoId, desc })

            await client.execute(
                'UPDATE todos SET todos=? WHERE grd=? AND grp=?',
                [JSON.stringify(todos), grd, grp]
            )
        }

        ctx.response.body = { success: true }
    } catch (e) {
        console.log(e.toString())
        ctx.response.body = { success: false }
    }
}

export default regTodo