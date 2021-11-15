import { Router } from 'express'
const RoomInOut = Router()

import {DB} from '../db/index'

/*------------
get /room
get /romm/:userd
put /room:userId
post /room/:userId
get /room/history
get /room/history/:userId
------------*/


RoomInOut.get('/', async(req, res) => {
    const T = DB.instance.transaction();
    try {
        const option = {
            where: {
                leaveTime: null
            }
        }
        const History = await DB.SchoolCards.findAll(option);
        (await T).commit();
        res.status(200).json(History)
    } catch(e) {
        (await T).rollback();
        const resMes = {
            "status": "Error",
            "message": "NotFound"
        }
        res.status(404).json(resMes)
    }
})


RoomInOut.get('/:userId', async (req, res) => {
    const T = DB.instance.transaction();
    try {
        const option = {
            where: {
                userId: req.query.userId,
                leaveTime: null
            }
        }
        const History = await DB.SchoolCards.findOne(option);
        (await T).commit();
        res.status(200).json(History)
    } catch(e) {
        (await T).rollback();
        const resMes = {
            "status": "Error",
            "message": "NotFound"
        }
        res.status(404).json(resMes)
    }
})


RoomInOut.patch('/:userId', async (req, res) => {
    const T = DB.instance.transaction()
    if (req.query.userId == "") {
        const resMes = {
            status: "Error",
            message: "Not Enough query"
        }
        res.status(402).json(resMes);
    } else {
        try {
            const nowTime = Date.now()

            const option = {
                where: {
                    userId: req.query.userId,
                    leaveTime: null
                }
            }
            const oldHistory = await DB.SchoolCards.findOne(option);
            //入室済みのデータがある場合退出処理を行って再度入室処理を行う
            if (oldHistory == null) {
                const sendData = {
                    leaveTime: nowTime
                }
                //退出処理
                await DB.SchoolCards.update(sendData, option)
            }
            const sendData = {
                userId: req.query.userId,
                enterTime: nowTime
            }
            await DB.SchoolCards.create(sendData)
            //最終的な現在状況を取得
            const History = await DB.SchoolCards.findOne(option);
            (await T).commit();
            res.status(200).json(History)
        } catch (e) {
            (await T).rollback();
            const resMes = {
                "status": "Error",
                "message": "ServerError"
            }
            res.status(500).json(resMes)
        }
    }
})


RoomInOut.post('/:userId', async (req, res) => {
    const T = DB.instance.transaction()
    if (req.query.userId == "") {
        const resMes = {
            status: "Error",
            message: "Not Enough query"
        }
        res.status(402).json(resMes);
    } else {
        try {
            const nowTime = Date.now()

            const option = {
                where: {
                    userId: req.query.userId,
                    leaveTime: null
                }
            }
            const oldHistory = await DB.SchoolCards.findOne(option);
            //入室済みのデータがある場合退出処理を行って再度入室処理を行う
            if (oldHistory == null) {
                const sendData = {
                    leaveTime: nowTime
                }
                //退出処理
                await DB.SchoolCards.update(sendData, option)
            }
            if (req.body.status == "in") {
                //入室処理
                const sendData = {
                    userId: req.query.userId,
                    enterTime: nowTime
                }
                await DB.SchoolCards.create(sendData)
            }
            //最終的な現在状況を取得
            const History = await DB.SchoolCards.findOne(option);
            (await T).commit();
            res.status(200).json(History)
        } catch (e) {
            (await T).rollback();
            const resMes = {
                "status": "Error",
                "message": "ServerError"
            }
            res.status(500).json(resMes)
        }
    }
})


RoomInOut.get('/history', async (req, res) => {
    const T = DB.instance.transaction();
    try {
        const History = await DB.SchoolCards.findAll();
        (await T).commit();
        res.status(200).json(History)
    } catch(e) {
        (await T).rollback();
        const resMes = {
            "status": "Error",
            "message": "NotFound"
        }
        res.status(404).json(resMes)
    }
})


RoomInOut.get('/history/:userId', async(req, res) => {
    const T = DB.instance.transaction();
    try {
        const config = {
            where: {
                userId: req.query.usreId
            }
        }
        const History = await DB.SchoolCards.findAll(config);
        (await T).commit();
        res.status(200).json(History)
    } catch(e) {
        (await T).rollback();
        const resMes = {
            "status": "Error",
            "message": "NotFound"
        }
        res.status(404).json(resMes)
    }
})

export { RoomInOut }