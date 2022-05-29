import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'

async function removeComment(ctx: RouterContext<'/api/board/removeComment'>) {
    const { boardId, commentId } = await ctx.request.body().value
}

export default removeComment