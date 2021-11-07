//Import
import { dbInstance } from './instance'
//model
import { RoomInOuts } from './model/RoomInOuts'
import { SchoolCards } from './model/SchoolCards'
import { Users } from './model/Users'
//#######################################################
const DB = {
    instance: dbInstance,
    RoomInOuts: RoomInOuts,
    SchoolCards: SchoolCards,
    Users: Users
}

export {
    DB
}