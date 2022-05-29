import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import randomString from '../../functions/randomString.ts'

async function regComment(ctx: RouterContext<'/api/board/regComment'>) {
    const { boardId, uploader, comment } = await ctx.request.body().value
    const commentId = randomString()
    const createdAt = new Date()
}

export default regComment