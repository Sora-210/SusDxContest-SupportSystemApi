// Import
import { Router } from 'express'
import { VERSION } from '../../index'

const SystemRouter = Router()

/*------------
get /version
get /helth
------------*/

//[get] /verson
SystemRouter.get('/version', (req, res) => {
    const responseMessage = {
        "status": "ok",
        "message": VERSION
    }
    res.status(200).json(responseMessage)
})

//[get] /helth
SystemRouter.get('/helth', (req, res) => {
    const responseMessage = {
        "status": "ok",
        "message": "ok"
    }
    res.status(200).json(responseMessage)
})

export { SystemRouter }