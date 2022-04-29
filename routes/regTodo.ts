async function regTodo(ctx: any) {
  const { analyze_mode, content } = /*JSON.parse(*/await ctx.request.body().value/*)*/

  // function getClientInfo() {
  //   let info
  //   return info
  // }

  console.log(analyze_mode)
  console.log(content)

  // if success
  return ctx.response.body = { success: true }
}

export default regTodo