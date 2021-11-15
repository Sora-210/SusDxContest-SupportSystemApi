import { Router } from 'express'

const APIChecker = function(req, res, next) {
    if (req.header['Authorization'] == "testApiKey") {
        next()
    } else {
        res.status(403).json({"message":"API error"})
    }
}

export { APIChecker }