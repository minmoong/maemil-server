import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.3.0/mod.ts'
import users from '../../db/users.ts'

async function register(ctx: RouterContext<'/api/session/register'>) {
    const { id, password } = await ctx.request.body().value

    users.push({ id, password: await bcrypt.hash(password) })

    ctx.response.body = { success: true, id }
    return
}

export default register