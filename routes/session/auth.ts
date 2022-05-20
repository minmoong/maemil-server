import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import { verify } from 'https://deno.land/x/djwt@v2.4/mod.ts'

async function auth(ctx: RouterContext<'/api/session/auth'>) {
    const jwt = await ctx.cookies.get('jwt')
    if(!jwt) {
        ctx.response.body = {
            success: false,
            message: '인증되지 않았습니다.'
        }
        return
    }

    const encoder = new TextEncoder()
    const keyBuf = encoder.encode('MYYYYYYSUPERSHITSECRET')
    const key = await crypto.subtle.importKey(
        'raw',
        keyBuf,
        { name: 'HMAC', hash: 'SHA-256' },
        true,
        ['sign', 'verify']
    )

    const payload = await verify(jwt, key).catch(err => console.error(err))
    if(!payload) {
        ctx.response.body = {
            success: false,
            message: '인증되지 않았습니다.'
        }
        return
    }

    ctx.response.body = { success: true, id: payload.id }
    return
}

export default auth