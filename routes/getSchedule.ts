async function getSchedule(ctx: any) {
  const { start_day, end_day } = /*JSON.parse(*/await ctx.request.body().value/*)*/
  const reqUrl = 'https://open.neis.go.kr/hub/SchoolSchedule'
  + '?KEY=9a2d23994fc7449c8f7af9e638c7ffdc'
  + '&Type=json'
  + '&ATPT_OFCDC_SC_CODE=G10'
  + '&SD_SCHUL_CODE=7451018'
  + '&AA_FROM_YMD=' + start_day
  + '&AA_TO_YMD=' + end_day
  const thenHandle = async (res: any) => await res.json()
  const scheduleList = await fetch(reqUrl).then(thenHandle)
  return ctx.response.body = { scheduleList }
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