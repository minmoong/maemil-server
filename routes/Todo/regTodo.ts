async function regTodo(ctx: any) {
  const { analyze_mode, desc } = await ctx.request.body().value

  // function getClientInfo() {
  //   let info
  //   return info
  // }

  console.log(analyze_mode)
  console.log(desc)

  // if success
  return ctx.response.body = { success: true }
}

export default regTodo