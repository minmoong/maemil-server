import { cron } from 'https://deno.land/x/deno_cron@v1.0.0/cron.ts'
import client from '../../db/client.ts'
import dayFormatter from '../../functions/dayFormatter.ts'
import { createRequire } from 'https://deno.land/std@0.136.0/node/module.ts'
import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts'

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
        return data.mealServiceDietInfo[1].row[0].DDISH_NM.replaceAll(/\(([^)]+)\)/g, '').replaceAll(' ', '').split('<br/>')
    }
    const result = await fetch(reqUrl).then(thenHandle)
    if (result === null) return '급식 정보가 없습니다.'
    else return result.join(', ')
}

async function getTimetable(grdp: any) {
    const require = createRequire(import.meta.url)
    const Timetable = require('comcigan-parser')
    const timetable = new Timetable()
    await timetable.init()
    await timetable.setSchool(65332)

    grdp = grdp.split('-')

    let data: string[] = [];

    if (new Date().getDay() === 6 || new Date().getDay() === 7) return '시간표 정보가 없습니다.'
    else {
        (await timetable.getTimetable())[grdp[0]][grdp[1]][new Date().getDay()-1].forEach((t: any) => {
            if (t.subject !== '') data.push(t.subject)
        })
    
        return data.join(', ')
    }
}

async function getBody(grdp: string) {
    const mealMessage = await getMeal()
    const ttblMessage = await getTimetable(grdp)
    return `<급식 🍟>\n${mealMessage}\n\n<시간표 ${grdp} ⏰>\n${ttblMessage}`
}

function sendMessage() {
    cron('0 0 7 * * 1-5', async () => {
        const useMessageData = (await client.execute('SELECT token, grdp FROM use_message') as any).rows
        for(const { token, grdp } of useMessageData) {
            await fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + config().SERVER_KEY
                },
                body: JSON.stringify({
                    to: token,
                    notification: {
                        title: "오늘의 급식&시간표! 😀",
                        body: await getBody(grdp),
                        click_action: "https://maemil.kr",
                        icon: "https://user-images.githubusercontent.com/62737839/171646163-7d57fdaf-24ad-4061-8612-2349e748e41f.png"
                    }
                })
            })
        }
    })
}

export default sendMessage