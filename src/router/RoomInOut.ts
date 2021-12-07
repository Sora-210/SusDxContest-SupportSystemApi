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
        const History = await DB.RoomInOuts.findAll(option);
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
                userId: req.params.userId,
                leaveTime: null
            }
        }
        const History = await DB.RoomInOuts.findOne(option);
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

import { NonNullFindOptions } from 'sequelize'
interface last_find_option extends NonNullFindOptions{
    order?: any
}

RoomInOut.patch('/:userId', async (req, res) => {
    const T = DB.instance.transaction()
    if (req.params.userId == "") {
        const resMes = {
            status: "Error",
            message: "Not Enough Params"
        }
        res.status(402).json(resMes);
    } else {
        try {
            const nowTime = Date.now()

            const option = {
                where: {
                    userId: req.params.userId,
                    leaveTime: null
                }
            }
            const oldHistory = await DB.RoomInOuts.findOne(option);
            //入室済みのデータがある場合退出処理を行って再度入室処理を行う
            if (oldHistory != null) {
                const sendData = {
                    leaveTime: nowTime
                }
                //退出処理
                await DB.RoomInOuts.update(sendData, option)
            } else {
                //入室済みデータがない場合は入室処理
                const sendData = {
                    userId: req.params.userId,
                    enterTime: nowTime
                }
                await DB.RoomInOuts.create(sendData)
            }

            //最終的な現在状況を取得
            const last_option:last_find_option = {
                where: {
                    userId: req.params.userId
                },
                order: [
                    ['id', 'DESC']
                ],
                rejectOnEmpty: true
            }
            const History = await DB.RoomInOuts.findOne(last_option);
            (await T).commit();
            res.status(200).json(History)
        } catch (e) {
            (await T).rollback();
            const resMes = {
                "status": "Error",
                "message": "ServerError"
            }
            res.status(500).json(resMes)
            console.log(e);
        }
    }
})


RoomInOut.post('/:userId', async (req, res) => {
    const T = DB.instance.transaction()
    if (req.params.userId == "") {
        const resMes = {
            status: "Error",
            message: "Not Enough Params"
        }
        res.status(402).json(resMes);
    } else {
        try {
            const nowTime = Date.now()

            const option = {
                where: {
                    userId: req.params.userId,
                    leaveTime: null
                }
            }
            const oldHistory = await DB.RoomInOuts.findOne(option);
            console.log(oldHistory);
            //入室済みのデータがある場合退出処理を行って再度入室処理を行う
            if (oldHistory != null) {
                const sendData = {
                    leaveTime: nowTime
                }
                //退出処理
                await DB.RoomInOuts.update(sendData, option)
            }
            if (req.body.status == "in") {
                //入室処理
                const sendData = {
                    userId: req.params.userId,
                    enterTime: nowTime
                }
                await DB.RoomInOuts.create(sendData)
            }
            //最終的な現在状況を取得
            const History = await DB.RoomInOuts.findOne(option);
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
        const History = await DB.RoomInOuts.findAll();
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
                userId: req.params.userId
            }
        }
        const History = await DB.RoomInOuts.findAll(config);
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