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
        "status": "success",
        "message": VERSION
    }
    res.status(200).json(responseMessage)
})

//[get] /health
SystemRouter.get('/health', (req, res) => {
    const responseMessage = {
        "status": "success",
        "message": "ok"
    }
    res.status(200).json(responseMessage)
})

export { SystemRouter }