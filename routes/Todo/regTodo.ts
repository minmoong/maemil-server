import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'

async function regTodo(ctx: RouterContext<'/api/todo/regTodo'>) {
  const { analyze_mode, desc } = await ctx.request.body().value

  console.log(analyze_mode)
  console.log(desc)

  return ctx.response.body = { success: true }
}

export default regTodo