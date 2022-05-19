import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts"

async function register(ctx: any) {
    const { id, password } = await ctx.request.body().value

    let users = [] // 테스트용 데이터

    users.push({
        id,
        password
        // password: await bcrypt.hash(password)
    })

    return ctx.response.body = { id }
}

export default register