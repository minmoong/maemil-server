import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import todos from '../../db/todos.ts'

async function getTodo(ctx: RouterContext<'/api/todo/getTodo'>) {
    const { grade, group }: {
        grade: keyof typeof todos;
        group: keyof typeof todos[keyof typeof todos];
    } = await ctx.request.body().value

    if(!Object.prototype.hasOwnProperty.call(todos, grade)) {
        return ctx.response.body = []
    } else if(!Object.prototype.hasOwnProperty.call(todos[grade], group)) {
        return ctx.response.body = []
    }

    ctx.response.body = todos[grade][group]
}

export default getTodo