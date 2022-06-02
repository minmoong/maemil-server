import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import client from '../../db/client.ts'

async function updateGrdp(ctx: RouterContext<'/api/useMessage/updateGrdp'>) {
    const { token, grdp } = await ctx.request.body().value

    try {
        const dataList = (await client.execute(
            'SELECT * FROM use_message WHERE token=?',
            [token]
        )).rows
        if (dataList?.length !== 0) {
            // 기존에 있는 토큰
            await client.execute(
                'UPDATE use_message SET grdp=? WHERE token=?',
                [grdp, token]
            )
        }
        ctx.response.body = { success: true }
    } catch (e) {
        console.log(e.toString())
        ctx.response.body = { success: false }
    }
}

export default updateGrdp