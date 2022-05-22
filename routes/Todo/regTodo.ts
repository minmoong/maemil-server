import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'

async function regTodo(ctx: RouterContext<'/api/todo/regTodo'>) {
  const { id, desc } = await ctx.request.body().value

  console.log(id)
  console.log(desc)

  return ctx.response.body = { success: true }
}

export default regTodo