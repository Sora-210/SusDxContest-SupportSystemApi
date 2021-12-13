// Import
import { Router } from 'express'
import { START_TIME, VERSION } from '../../index'

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
        "message": {
            "startTime": START_TIME.getFullYear() + "/" + START_TIME.getMonth() + "/" + START_TIME.getDate() + " " + START_TIME.getHours() + ":" + START_TIME.getMinutes() + ":" + START_TIME.getSeconds()
        }
    }
    res.status(200).json(responseMessage)
})

export { SystemRouter }