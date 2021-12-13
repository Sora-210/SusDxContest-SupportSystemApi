// Import 
import express from 'express'
import { json as BodyParserJson } from 'body-parser'
import cors from 'cors'
//#######################################
//MagicNumber
//ServerPort
const PORT:Number = 8967
const VERSION:String = '0.2.0 beta'
const START_TIME:Date = new Date();
export { VERSION , START_TIME}
//#######################################
//expressSetting
const app:express.Express = express()
app.use(BodyParserJson())
app.use(cors());
//#######################################
//Routing
import { SystemRouter } from './src/router/System'
app.use('/', SystemRouter)
//以下認証必須
import { APIChecker } from './src/CheckerAPIKEY'
app.use(APIChecker)
import { RoomInOut } from './src/router/RoomInOut'
app.use('/room', RoomInOut)
import { SchoolCard } from './src/router/SchoolCard'
app.use('/schoolcards', SchoolCard)
import { User } from './src/router/User'
app.use('/users', User)
//#######################################
//Listening
app.listen(PORT, () => {
    console.log("API Server Started.")
    console.log("#######################")
    console.log("APIversion: " + VERSION)
    console.log("Listening port: " + PORT)
    console.log("#######################")
})