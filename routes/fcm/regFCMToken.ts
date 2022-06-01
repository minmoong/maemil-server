import { RouterContext } from 'https://deno.land/x/oak@v10.2.0/mod.ts'
import client from '../../db/client.ts'

async function regFCMToken(ctx: RouterContext<'/api/fcm/regFCMToken'>) {
    const { token, timetableLatestGrdp } = await ctx.request.body().value
    // const res = await fetch('https://fcm.googleapis.com/fcm/send', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer AAAAPGlzXck:APA91bGpt-mEkRUkNN1hMntn0ll6Z0G6Jctduiux9f2ITX4Xcocqkw3-ttuInjs0D5hOXlkil5i_F8eozEPcBCvhzJTIYhGpZXMpwRpuDn1lK5pkVZcgp3CfRaZIcXa9m8Dug9LDE83H'
    //     },
    //     body: JSON.stringify({
    //         to: token,
    //         notification: {
    //             title: "토큰 받았어여.",
    //             body: "꿀꺽!"
    //         }
    //     })
    // })

    try {
        const dataList = (await client.execute(
            'SELECT * FROM use_message_tokens WHERE token=?',
            [token]
        )).rows
        if (dataList?.length === 0) {
            // 기존에 없는 토큰
            await client.execute(
                'INSERT INTO use_message_tokens (token, timetableLatestGrdp) VALUES (?, ?)',
                [token, timetableLatestGrdp]
            )
        } else if (dataList?.length !== 0) {
            // 기존에 있는 토큰
            await client.execute(
                'UPDATE use_message_tokens SET timetableLatestGrdp=? WHERE token=?',
                [timetableLatestGrdp, token]
            )
        }
        ctx.response.body = { success: true }
    } catch (e) {
        console.log(e.toString())
        ctx.response.body = { success: false }
    }
}

export default regFCMToken