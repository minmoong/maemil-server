import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import client from '../../db/client.ts'

async function getArticle(ctx: RouterContext<'/api/board/getArticle'>) {
    const { href } = await ctx.request.body().value
    
    try {
        const result = await client.execute(
            'SELECT * FROM boards WHERE href=?',
            [href]
        )
        ctx.response.body = { success: true, data: result.rows }
    } catch (e) {
        console.log(e.toString())
        ctx.response.body = { success: false }
    }
}

export default getArticle