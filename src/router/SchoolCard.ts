// Import
import { Router } from 'express'
const SchoolCard = Router()

import {DB} from '../db/index'

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
        const resMes = {
            "status": "Error",
            "message": "NotFound"
        }
        res.status(404).json(resMes)
    }
})


SchoolCard.post('/', async (req, res) => {
    const T = DB.instance.transaction();
    if (req.body.schoolCardId == "" || req.body.userId == "") {
        const resMes = {
            status: "Error",
            message: "Not Enough Body"
        }
        res.status(402).json(resMes);
    } else {
        try {
            const sendData = {
                id: req.body.schoolCardId,
                userId: req.body.userId
            }
            const dbRes = await DB.SchoolCards.create(sendData);
            (await T).commit()
            res.status(201).json(dbRes);
        } catch(e) {
            (await T).rollback();
            const resMes = {
                "status": "Error",
                "message": "ServerError"
            }
            res.status(500).json(resMes);
        }
    }
})


SchoolCard.get('/:schoolcardId', async (req, res) => {
    const T = DB.instance.transaction();
    if (req.params.schoolcardId == "") {
        const resMes = {
            status: "Error",
            message: "Not Enough Params"
        }
        res.status(402).json(resMes);
    } else {
        try {
            const option = {
                where: {
                    id: req.params.schoolcardId
                }
            }
            const Users = await DB.SchoolCards.findOne(option);
            (await T).commit();
            res.status(200).json(Users)
        } catch(e) {
            (await T).rollback();
            const resMes = {
                "status": "Error",
                "message": "NotFound"
            }
            res.status(404).json(resMes)
        }
    }
})

export { SchoolCard }