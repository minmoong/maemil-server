import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import client from '../../db/client.ts'

async function registerToken(ctx: RouterContext<'/api/useMessage/registerToken'>) {
    const { token } = await ctx.request.body().value

    try {
        const dataList = (await client.execute(
            'SELECT * FROM use_message WHERE token=?',
            [token]
        )).rows
        if (dataList?.length === 0) {
            // 기존에 없는 토큰
            await client.execute(
                'INSERT INTO use_message (token, grdp) VALUES (?, ?)',
                [token, '1-1']
            )
        }
        ctx.response.body = { success: true }
    } catch (e) {
        console.log(e.toString())
        ctx.response.body = { success: false }
    }
}

export default registerToken