import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import client from '../../db/client.ts'

async function removeTodo(ctx: RouterContext<'/api/todo/removeTodo'>) {
    type Todo = {
        todoId: string;
        desc: string;
    }

    const { grd, grp, todoId } = await ctx.request.body().value

    try {
        const result = (await client.execute(
            'SELECT todos FROM todos WHERE grd=? AND grp=?',
            [grd, grp]
        ))
        
        let todos: Todo[] = JSON.parse((result.rows as any)[0].todos)
        todos = todos.filter(todo => todo.todoId !== todoId)

        if(todos.length === 0) {
            await client.execute(
                'DELETE FROM todos WHERE grd=? AND grp=?',
                [grd, grp]
            )
        } else {
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

export default removeTodo