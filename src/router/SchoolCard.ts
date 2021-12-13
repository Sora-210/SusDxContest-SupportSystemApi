// Import
import { Router } from 'express'
const SchoolCard = Router()

import {DB} from '../db/index'
import {Msg} from '../Msg'

/*------------
get /schoolcard
post /schoolcard
get /schoolcard/:schoolcardId
------------*/

SchoolCard.get('/', async (req, res) => {
    const T = DB.instance.transaction();
    try {
        const Users = await DB.SchoolCards.findAll();
        (await T).commit();
        res.status(200).json(Users)
    } catch(e) {
        (await T).rollback();
        console.log("###########################")
        console.error(e)
        res.status(500).json(Msg.ServerError);
    }
})


SchoolCard.post('/', async (req, res) => {
    if (!req.body.schoolCardId || !req.body.userId) {
        res.status(402).json(Msg.NotEnoughProp);
        return 0
    }
    const T = DB.instance.transaction();
    try {
        const isUser = await DB.Users.findOne({
            where: {
                id: req.body.userId
            }
        })
        if (!isUser) {
            res.status(404).json(Msg.NotFound);
            (await T).commit()
            return 0
        }

        const isCard = await DB.SchoolCards.findOne({
            where: {
                userId: req.body.userId
            }
        })
        if (isCard) {
            res.status(400).json({
                "status":"Error",
                "message":"There is already Data",
                "schoolCardData": isCard
            });
            (await T).commit()
            return 0
        }

        const sendData = {
            id: req.body.schoolCardId,
            userId: req.body.userId
        }
        const dbRes = await DB.SchoolCards.create(sendData);
        (await T).commit()
        res.status(201).json(dbRes);
    } catch(e) {
        (await T).rollback();
        console.log("###########################")
        console.error(e)
        res.status(500).json(Msg.ServerError);
    }
})


SchoolCard.get('/:schoolcardId', async (req, res) => {
    if (!req.params.schoolcardId) {
        res.status(402).json(Msg.NotEnoughProp);
        return 0
    }
    const T = DB.instance.transaction();
    try {
        const SchoolCard = await DB.SchoolCards.findOne({
            where: {
                id: req.params.schoolcardId
            }
        });
        (await T).commit();
        if (SchoolCard) {
            res.status(200).json(SchoolCard)
        } else {
            res.status(404).json(Msg.NotFound)
        }
        
    } catch(e) {
        (await T).rollback();
        console.log("###########################")
        console.error(e)
        res.status(500).json(Msg.ServerError);
    }
})

export { SchoolCard }