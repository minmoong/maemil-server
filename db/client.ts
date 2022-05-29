import { Client } from 'https://deno.land/x/mysql@v2.10.2/mod.ts'

const client = await new Client().connect({
    hostname: 'devminmoong.cafe24.com',
    username: 'devminmoong',
    db: 'devminmoong',
    password: 'Minmoongsdft8753'
})

export default client