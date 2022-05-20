async function getSchedule(ctx: any) {
    const { startDay, endDay } = await ctx.request.body().value
    const reqUrl = 'https://open.neis.go.kr/hub/SchoolSchedule'
    + '?KEY=9a2d23994fc7449c8f7af9e638c7ffdc'
    + '&Type=json'
    + '&ATPT_OFCDC_SC_CODE=G10'
    + '&SD_SCHUL_CODE=7451018'
    + '&AA_FROM_YMD=' + startDay
    + '&AA_TO_YMD=' + endDay
    const thenHandle = async (res: any) => {
        const data = await res.json()
        if(!Object.prototype.hasOwnProperty.call(data, 'SchoolSchedule')) return null
        return data.SchoolSchedule[1].row
    }
    const scheduleList = await fetch(reqUrl).then(thenHandle)
    if (scheduleList === null) return ctx.response.body = { success: false }
    return ctx.response.body = { success: true, scheduleList }
}

export default getSchedule

// if(res.data.SchoolSchedule === undefined) return {}
// else {
//   let scheduleList: any[] = []
//   res.data.SchoolSchedule[1].row.forEach((schedule: any) => {
//     scheduleList.push({
//       AA_YMD: schedule.AA_YMD,
//       EVENT_NM: schedule.EVENT_NM,
//       ONE_GRADE_EVENT_YN: schedule.ONE_GRADE_EVENT_YN,
//       TW_GRADE_EVENT_YN: schedule.TW_GRADE_EVENT_YN,
//       THREE_GRADE_EVENT_YN: schedule.THREE_GRADE_EVENT_YN
//     })
//   })
//   return scheduleList
// }