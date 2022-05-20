import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'

async function removeTodo(ctx: RouterContext<'/api/todo/removeTodo'>) {
  const { todo } = await ctx.request.body().value

  console.log(todo)

  return ctx.response.body = { success: true }
}

export default removeTodo