import { Router } from 'express'
const User = Router()

import {DB} from '../db/index'

/*------------
get /users
post /users
get /users/:userId
put /users/:userId
delete /users/:userId
------------*/

User.get('/', async (req, res) => {
    const T = DB.instance.transaction();
    try {
        const Users = await DB.Users.findAll();
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


User.post('/', async (req, res) => {
    const T = DB.instance.transaction();
    if (req.body.name == "" || req.body.schoolId == "") {
        const resMes = {
            status: "Error",
            message: "Not Enough Body"
        }
        res.status(402).json(resMes);
    } else {
        try {
            const sendData = {
                name: req.body.name,
                schoolId: req.body.schoolId
            }
            const dbRes = await DB.Users.create(sendData);
            (await T).commit()
            res.status(201).json(dbRes);
        } catch(e) {
            (await T).rollback();
            const resMes = {
                "status": "Error",
                "message": "ServerError"
            }
            res.status(404).json(resMes)
        }
    }
})


User.get('/:userId', async (req, res) => {
    const T = DB.instance.transaction();
    if (req.params.userId == "") {
        const resMes = {
            status: "Error",
            message: "Not Enough Params"
        }
        res.status(402).json(resMes);
    } else {
        try {
            const option = {
                where: {
                    id: req.params.userId
                }
            }
            const Users = await DB.Users.findOne(option);
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


User.patch('/:userId', async (req, res) => {
    const T = DB.instance.transaction();
    if (req.params.userId == "") {
        const resMes = {
            status: "Error",
            message: "Not Enough Params"
        }
        res.status(402).json(resMes);
    } else {
        try {
            const option = {
                where: {
                    id: req.params.userId
                }
            }
            const sendData = req.body;
            const Users = await DB.Users.update(sendData, option);
            (await T).commit();
            res.status(200).json(Users)
        } catch(e) {
            (await T).rollback();
            const resMes = {
                "status": "Error",
                "message": "ServerError"
            }
            res.status(500).json(resMes)
        }
    }
})


User.delete('/:userId', async (req, res) => {
    const T = DB.instance.transaction();
    if (req.params.userId == "") {
        const resMes = {
            status: "Error",
            message: "Not Enough Query"
        }
        res.status(402).json(resMes);
    } else {
        try {
            const option = {
                where: {
                    id: req.params.userId
                }
            }
            const Users = await DB.Users.destroy(option);
            (await T).commit();
            res.status(200).json(Users)
        } catch(e) {
            (await T).rollback();
            const resMes = {
                "status": "Error",
                "message": "ServerError"
            }
            res.status(500).json(resMes)
        }
    }
})

export { User }