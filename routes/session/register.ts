import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.3.0/mod.ts'
import users from '../../db/users.ts'

async function register(ctx: RouterContext<'/api/session/register'>) {
    const { sid, name, id, password, email } = await ctx.request.body().value

    users.push({ sid, name, id, password: await bcrypt.hash(password), email })

    return ctx.response.body = { success: true, id }
}

export default register