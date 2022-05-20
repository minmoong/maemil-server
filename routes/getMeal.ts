import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'

async function getMeal(ctx: RouterContext<'/api/getMeal'>) {
    const { date } = await ctx.request.body().value
    const reqUrl = 'https://open.neis.go.kr/hub/mealServiceDietInfo'
    + '?KEY=9a2d23994fc7449c8f7af9e638c7ffdc'
    + '&Type=json'
    + '&ATPT_OFCDC_SC_CODE=G10'
    + '&SD_SCHUL_CODE=7451018'
    + '&MLSV_YMD=' + date
    const thenHandle = async (res: Response) => {
        const data = await res.json()
        if(!Object.prototype.hasOwnProperty.call(data, 'mealServiceDietInfo')) return null
        return data.mealServiceDietInfo[1].row[0].DDISH_NM.split('<br/>')
    }
    const mealList = await fetch(reqUrl).then(thenHandle)
    if (mealList === null) {
        ctx.response.body = { success: false }
        return
    }
    ctx.response.body = { success: true, mealList }
    return
}

export default getMeal