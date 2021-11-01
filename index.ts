// Import 
import express from 'express'
import { json as BodyParserJson } from 'body-parser'
import cors from 'cors'
//#######################################
//MagicNumber
//ServerPort
const PORT:Number = 8967
const VERSION:String = '0.1.0 beta'
export { VERSION }
//#######################################
//expressSetting
const app:express.Express = express()
app.use(BodyParserJson())
app.use(cors());
//#######################################
//Routing
import { SystemRouter } from './src/router/System'
app.use('/', SystemRouter)
//#######################################
//Listening
app.listen(PORT, () => {
    console.log("API Server Started.")
    console.log("#######################")
    console.log("APIversion: " + VERSION)
    console.log("Listening port: " + PORT)
    console.log("#######################")
})