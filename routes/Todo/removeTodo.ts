async function removeTodo(ctx: any) {
  const { todo } = await ctx.request.body().value

  console.log(todo)

  // if success
  return ctx.response.body = { success: true }
}

export default removeTodo