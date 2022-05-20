import { create } from 'https://deno.land/x/djwt@v2.4/mod.ts'

async function login(ctx: any) {
    const { id, password } = await ctx.request.body().value

    let users = [ // 테스트용 데이터
        {
            id: 'minmoong',
            password: 'minmoong'
        },
        {
            id: 'afosvpaqa',
            password: '#07fas.1'
        }
    ]

    let user = users.filter(user => user.id === id && user.password === password)[0]
    
    if(!user) {
        return ctx.response.body = {
            success: false,
            message: '아이디 또는 비밀번호가 일치하지 않습니다.'
        }
    }

    const jwt = await create(
        { alg: 'HS512', typ: 'JWT' },
        { id: user.id },
        await crypto.subtle.generateKey(
            { name: 'HMAC', hash: 'SHA-512' },
            true,
            ['sign', 'verify'],
        )
    )

    ctx.cookies.set('jwt', jwt, { httpOnly: true })

    ctx.response.body = { success: true }
}
  
export default login