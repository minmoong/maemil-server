import { createRequire } from "https://deno.land/std@0.136.0/node/module.ts"

const require = createRequire(import.meta.url)
const Timetable = require('comcigan-parser')
const timetable = new Timetable()

async function getTimetable(ctx: any) {
  await timetable.init()
  await timetable.setSchool(65332)
  return ctx.response.body = await timetable.getTimetable()
}

export default getTimetable