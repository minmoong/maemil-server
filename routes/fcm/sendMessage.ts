import { cron } from 'https://deno.land/x/deno_cron@v1.0.0/cron.ts'
import client from '../../db/client.ts'
import dayFormatter from '../../functions/dayFormatter.ts'
import { createRequire } from 'https://deno.land/std@0.136.0/node/module.ts'

async function getMeal() {
    const reqUrl = 'https://open.neis.go.kr/hub/mealServiceDietInfo'
    + '?KEY=9a2d23994fc7449c8f7af9e638c7ffdc'
    + '&Type=json'
    + '&ATPT_OFCDC_SC_CODE=G10'
    + '&SD_SCHUL_CODE=7451018'
    + '&MLSV_YMD=' + dayFormatter(new Date())
    const thenHandle = async (res: Response) => {
        const data = await res.json()
        if(!Object.prototype.hasOwnProperty.call(data, 'mealServiceDietInfo')) return null
        return data.mealServiceDietInfo[1].row[0].DDISH_NM.split('<br/>')
    }
    return (await fetch(reqUrl).then(thenHandle)).join('\n')
}

async function getTimetable(timetableLatestGrdp: string) {
    const require = createRequire(import.meta.url)
    const Timetable = require('comcigan-parser')
    const timetable = new Timetable()
    await timetable.init()
    await timetable.setSchool(65332)

    const grdp = timetableLatestGrdp.split('-')

    let data: string[] = [];
    (await timetable.getTimetable())[grdp[0]][grdp[1]][new Date().getDay()-1].forEach((t: any) => data.push(`${t.subject} - ${t.teacher}`))

    return data.join('\n')
}

function sendMessage() {
    console.log('start')
    
    cron('0 20 4 * * *', async () => { //0 0 7 * * *
        const useMessageData = (await client.execute('SELECT token, timetableLatestGrdp FROM use_message_tokens') as any).rows
        for(const { token, timetableLatestGrdp } of useMessageData) {
            /* 급식 알림 */
            await fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer AAAAPGlzXck:APA91bGpt-mEkRUkNN1hMntn0ll6Z0G6Jctduiux9f2ITX4Xcocqkw3-ttuInjs0D5hOXlkil5i_F8eozEPcBCvhzJTIYhGpZXMpwRpuDn1lK5pkVZcgp3CfRaZIcXa9m8Dug9LDE83H'
                },
                body: JSON.stringify({
                    to: token,
                    notification: {
                        title: "오늘의 급식! 🍽",
                        body: await getMeal()
                    }
                })
            })

            /* 시간표 알림 */
            await fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer AAAAPGlzXck:APA91bGpt-mEkRUkNN1hMntn0ll6Z0G6Jctduiux9f2ITX4Xcocqkw3-ttuInjs0D5hOXlkil5i_F8eozEPcBCvhzJTIYhGpZXMpwRpuDn1lK5pkVZcgp3CfRaZIcXa9m8Dug9LDE83H'
                },
                body: JSON.stringify({
                    to: token,
                    notification: {
                        title: `오늘의 ${timetableLatestGrdp} 시간표! 🗓`,
                        body: await getTimetable(timetableLatestGrdp)
                    }
                })
            })
        }
    })
}

export default sendMessage