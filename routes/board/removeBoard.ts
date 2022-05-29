import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import client from '../../db/client.ts'

async function removeBoard(ctx: RouterContext<'/api/board/removeBoard'>) {
    const { boardId } = await ctx.request.body().value

    try {
        await client.execute(
            'DELETE FROM boards WHERE boardId=?',
            [boardId]
        )

        ctx.response.body = { success: true }
    } catch (e) {
        console.log(e.toString())
        ctx.response.body = { success: false }
    }
}

export default removeBoard