import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import randomString from '../../functions/randomString.ts'
import client from '../../db/client.ts'

async function regBoard(ctx: RouterContext<'/api/board/regBoard'>) {
    type Article = {
        // href: string;
        div: string;
        title: string;
        uploader: string;
        contents: string;
        // comments: { uploader: string; comment: string; }[];
        // views: number;
    }

    const { div, title, uploader, contents }: Article = await ctx.request.body().value
    let id: number
    const createdAt = new Date()
    const href = '/' + randomString()
    const comments = '[]'
    const views = 0

    try {
        const lastId = (await client.execute('SELECT id FROM boards ORDER BY id DESC LIMIT 1') as any).rows[0].id
        id = lastId + 1

        await client.execute(
            `INSERT INTO boards (id, createdAt, href, division, title, uploader, contents, comments, views)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, createdAt, href, div, title, uploader, contents, comments, views]
        )

        ctx.response.body = { success: true }
    } catch (e) {
        console.log(e.toString())
        ctx.response.body = { success: false }
    }
}

export default regBoard