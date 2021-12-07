import { Router } from 'express'

const APIChecker = function(req, res, next) {
    const token = req.header('Authorization')
    if (token == "cQFZkLQLSDBbPrshFD6G") {
        next()
    } else {
        res.status(403).json({"message":"API error"})
    }
}

export { APIChecker }