async function getMeal(ctx: any) {
  const { date } = JSON.parse(await ctx.request.body().value)
  const reqUrl = 'https://open.neis.go.kr/hub/mealServiceDietInfo'
  + '?KEY=9a2d23994fc7449c8f7af9e638c7ffdc'
  + '&Type=json'
  + '&ATPT_OFCDC_SC_CODE=G10'
  + '&SD_SCHUL_CODE=7451018'
  + '&MLSV_YMD=' + date
  const thenHandle = async (res: any) => {
    const data = await res.json()
    if(!Object.prototype.hasOwnProperty.call(data, 'mealServiceDietInfo')) return null
    return (
      data.mealServiceDietInfo[1].row[0].DDISH_NM
        .split('<br/>')
        .map((meal: string) => meal.replace(/[0-9.]/g, ''))
    )
  }
  const mealList = await fetch(reqUrl).then(thenHandle)
  if (mealList === null) return ctx.response.body = { success: false }
  else return ctx.response.body = { success: true, mealList }
}

export default getMeal