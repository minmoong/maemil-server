import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import client from '../../db/client.ts'

async function getBoard(ctx: RouterContext<'/api/board/getBoard'>) {
    const { arc } = await ctx.request.body().value
    
    try {
        const lastId = (await client.execute('SELECT id FROM boards ORDER BY id DESC LIMIT 1') as any).rows[0].id
        const result = await client.execute(
            'SELECT createdAt, href, division, title, uploader, views FROM boards WHERE id<=? ORDER BY id DESC LIMIT 10',
            [lastId-arc*10]
        )
        
        ctx.response.body = { success: true, data: result.rows }
    } catch (e) {
        console.log(e.toString())
        ctx.response.body = { success: false }
    }
}

export default getBoard