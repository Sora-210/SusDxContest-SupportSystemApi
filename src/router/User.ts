import { Router } from 'express'
const User = Router()

import {DB} from '../db/index'
import { Msg } from '../Msg'

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
        console.log("###########################")
        console.error(e)
        res.status(500).json(Msg.ServerError);
    }
})


User.post('/', async (req, res) => {
    if (!req.body.name || !req.body.schoolId) {
        res.status(402).json(Msg.NotEnoughProp);
        return 0
    }
    const T = DB.instance.transaction();
    try {
        const sendData = {
            name: req.body.name,
            schoolId: req.body.schoolId
        }
        const resUserCreate = await DB.Users.create(sendData);
        (await T).commit()
        res.status(201).json(resUserCreate);
    } catch(e) {
        (await T).rollback();
        console.log("###########################")
        console.error(e)
        res.status(500).json(Msg.ServerError);
    }
})


User.get('/:userId', async (req, res) => {
    if (!req.params.userId) {
        res.status(402).json(Msg.NotEnoughProp);
        return 0
    }
    const T = DB.instance.transaction();
    try {
        const getUser = await DB.Users.findOne({
            where: {
                id: req.params.userId
            }
        });
        (await T).commit();

        if (getUser) {
            res.status(200).json(getUser)
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


User.patch('/:userId', async (req, res) => {
    if (!req.params.userId) {
        res.status(402).json(Msg.NotEnoughProp)
        return 0
    }
    const T = DB.instance.transaction();
    try {
        const isUpdate = await DB.Users.update(req.body, {
            where: {
                id: req.params.userId
            }
        });
        (await T).commit();
        console.log(isUpdate)
        if (isUpdate[0]) {
            const User = await DB.Users.findOne({
                where: {
                    id: req.params.userId
                }
            });
            res.status(200).json(User)
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


User.delete('/:userId', async (req, res) => {
    if (!req.params.userId) {
        res.status(402).json(Msg.NotEnoughProp);
        return 0
    }
    const T = DB.instance.transaction();
    try {
        const isDelete = await DB.Users.destroy({
            where: {
                id: req.params.userId
            }
        });
        (await T).commit();
        if (isDelete) {
            res.status(200).json([])
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

export { User }