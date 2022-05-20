import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import { createRequire } from 'https://deno.land/std@0.136.0/node/module.ts'

const require = createRequire(import.meta.url)
const Timetable = require('comcigan-parser')
const timetable = new Timetable()

async function getTimetable(ctx: RouterContext<'/api/getTimetable'>) {
    await timetable.init()
    await timetable.setSchool(65332)
    ctx.response.body = await timetable.getTimetable()
    return
}

export default getTimetable