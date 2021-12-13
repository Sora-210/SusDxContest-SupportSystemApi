import { Router } from 'express'
const RoomInOut = Router()

import {DB} from '../db/index'
import {Msg} from '../Msg'

import { NonNullFindOptions } from 'sequelize'
interface order_find_option extends NonNullFindOptions{
    order?: any
}

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
        const History = await DB.RoomInOuts.findAll({
            where: {
                leaveTime: null
            }
        });
        (await T).commit();
        res.status(200).json(History)
    } catch(e) {
        (await T).rollback();
        console.log("###########################")
        console.error(e)
        res.status(500).json(Msg.ServerError);
    }
})

RoomInOut.get('/history', async (req, res) => {
    console.log("1")
    const T = DB.instance.transaction();
    try {
        const option:order_find_option = {
            order: [
                ['id', 'DESC']
            ],
            rejectOnEmpty: false
        }
        const Historys = await DB.RoomInOuts.findAll(option);
        (await T).commit();
        res.status(200).json(Historys)
    } catch(e) {
        (await T).rollback();
        console.log("###########################")
        console.error(e)
        res.status(500).json(Msg.ServerError);
    }
})


RoomInOut.get('/history/:userId', async(req, res) => {
    console.log("2")
    if (!req.params.userId) {
        res.status(402).json(Msg.NotEnoughProp);
        return 0
    }
    const T = DB.instance.transaction();
    try {
        const option:order_find_option = {
            where: {
                userId: req.params.userId
            },
            order: [
                ['id', 'DESC']
            ],
            rejectOnEmpty: false
        }
        const Historys = await DB.RoomInOuts.findAll(option);
        (await T).commit();
        res.status(200).json(Historys)
    } catch(e) {
        (await T).rollback();
        console.log("###########################")
        console.error(e)
        res.status(500).json(Msg.ServerError);
    }
})


RoomInOut.get('/:userId', async (req, res) => {
    if (!req.params.userId) {
        res.status(402).json(Msg.NotEnoughProp);
        return 0
    }
    const T = DB.instance.transaction();
    try {
        const isUserRoom = await DB.RoomInOuts.findOne({
            where: {
                userId: req.params.userId,
                leaveTime: null
            }
        });
        const Res = {
            "userId": req.params.userId,
            "status": "out",
            "enterTime": null
        }
        if (isUserRoom) {
            Res.status = "in"
            Res.enterTime = isUserRoom.enterTime
        }
        (await T).commit();
        res.status(200).json(Res)
    } catch(e) {
        (await T).rollback();
        console.log("###########################")
        console.error(e)
        res.status(500).json(Msg.ServerError);
    }
})


RoomInOut.patch('/:userId', async (req, res) => {
    if (!req.params.userId) {
        res.status(402).json(Msg.NotEnoughProp);
        return 0
    }
    const T = DB.instance.transaction()
    try {
        const nowTime = Date.now()

        const isOldHistory = await DB.RoomInOuts.findOne({
            where: {
                userId: req.params.userId,
                leaveTime: null
            }
        });

        //入室済みのデータがある場合退出処理を行って再度入室処理を行う
        if (isOldHistory) { 
            //退出処理
            await DB.RoomInOuts.update({
                leaveTime: nowTime
            }, {
                where: {
                    id: isOldHistory.id
                }
            })
        } else {
            //入室済みデータがない場合は入室処理
            await DB.RoomInOuts.create({
                userId: req.params.userId,
                enterTime: nowTime
            })
        }

        //最終的な現在状況を取得
        const last_option:order_find_option = {
            where: {
                userId: req.params.userId,
                leaveTime: null
            },
            order: [
                ['id', 'DESC']
            ],
            rejectOnEmpty: false
        }
        const isUserRoom = await DB.RoomInOuts.findOne(last_option);
        const Res = {
            "userId": req.params.userId,
            "status": "out",
            "enterTime": null
        }
        if (isUserRoom) {
            Res.status = "in"
            Res.enterTime = isUserRoom.enterTime
        }
        (await T).commit();
        res.status(200).json(Res)
    } catch (e) {
        (await T).rollback();
        console.log("###########################")
        console.error(e)
        res.status(500).json(Msg.ServerError);
    }
})


RoomInOut.post('/:userId', async (req, res) => {
    const T = DB.instance.transaction()
    if (!req.params.userId || !req.body.status) {
        res.status(402).json(Msg.NotEnoughProp);
        return 0
    }
    try {
        const nowTime = Date.now()

        const isOldHistory = await DB.RoomInOuts.findOne({
            where: {
                userId: req.params.userId,
                leaveTime: null
            }
        });

        //入室済みのデータがある場合退出処理を行って再度入室処理を行う
        if (isOldHistory) {
            //退出処理
            await DB.RoomInOuts.update({
                leaveTime: nowTime
            }, {
                where: {
                    id: isOldHistory.id
                }
            })
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
        const last_option:order_find_option = {
            where: {
                userId: req.params.userId,
                leaveTime: null
            },
            order: [
                ['id', 'DESC']
            ],
            rejectOnEmpty: false
        }
        const isRoomStatus = await DB.RoomInOuts.findOne(last_option);
        const Res = {
            "userId": req.params.userId,
            "status": "out",
            "enterTime": null
        }
        if (isRoomStatus) {
            Res.status = "in"
            Res.enterTime = isRoomStatus.enterTime
        }
        (await T).commit();
        res.status(200).json(Res)
    } catch (e) {
        (await T).rollback();
        console.log("###########################")
        console.error(e)
        res.status(500).json(Msg.ServerError);
    }
})

export { RoomInOut }