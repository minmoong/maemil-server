import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import client from '../../db/client.ts'

async function getTodo(ctx: RouterContext<'/api/todo/getTodo'>) {
    const { grade, group } = await ctx.request.body().value

    try {
        const result = await client.execute(
            'SELECT todos FROM todos WHERE grd=? AND grp=?',
            [grade, group]
        )

        if((result as any)[0]?.todos === undefined) {
            ctx.response.body = { success: true, data: '[]' }
        } else {
            ctx.response.body = { success: true, data: (result.rows as any)[0].todos }
        }

        
    } catch (e) {
        console.log(e.toString())
        ctx.response.body = { success: false }
    }
}

export default getTodo