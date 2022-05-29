import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import client from '../../db/client.ts'

async function removeTodo(ctx: RouterContext<'/api/todo/removeTodo'>) {
    type Todo = {
        todoId: string;
        desc: string;
    }

    const { grade, group, todoId } = await ctx.request.body().value

    try {
        const result = (await client.execute(
            'SELECT todos FROM todos WHERE grd=? AND grp=?',
            [grade, group]
        )).rows
        
        let todos: Todo[] = JSON.parse((result as any)[0].todos)
        todos = todos.filter(todo => todo.todoId !== todoId)

        if(todos.length === 0) {
            await client.execute(
                'DELETE FROM todos WHERE grd=? AND grp=?',
                [grade, group]
            )
        } else {
            await client.execute(
                'UPDATE todos SET todos=? WHERE grd=? AND grp=?',
                [JSON.stringify(todos), grade, group]
            )
        }

        ctx.response.body = { success: true }
    } catch (e) {
        console.log(e.toString())
        ctx.response.body = { success: false }
    }
}

export default removeTodo