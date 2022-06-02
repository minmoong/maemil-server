import { Client } from 'https://deno.land/x/mysql@v2.10.2/mod.ts'
import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts'

const env = config()

const client = await new Client().connect({
    hostname: env.HOSTNAME,
    username: env.USERNAME,
    db: env.DB,
    password: env.PASSWORD
})

export default client