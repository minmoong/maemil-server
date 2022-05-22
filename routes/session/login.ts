import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import { Header, Payload, getNumericDate, create } from 'https://deno.land/x/djwt@v2.4/mod.ts'
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.3.0/mod.ts'
import users from '../../db/users.ts'

async function login(ctx: RouterContext<'/api/session/login'>) {
    const { id, password } = await ctx.request.body().value

    const user = users.filter(user => id === user.id)[0]
    if(!user) {
        return ctx.response.body = {
            success: false,
            message: '존재하지 않는 아이디 입니다.'
        }
    }

    if(!await bcrypt.compare(password, user.password)) {
        return ctx.response.body = {
            success: false,
            message: '비밀번호가 일치하지 않습니다.'
        }
    }

    const header: Header = {
        alg: 'HS256',
        typ: 'JWT'
    }
    const payload: Payload = {
        id: user.id,
        exp: getNumericDate(604800)
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
    const jwt = await create(header, payload, key)

    ctx.cookies.set('jwt', jwt, { httpOnly: true })
    return ctx.response.body = { success: true, id: user.id }
}
  
export default login