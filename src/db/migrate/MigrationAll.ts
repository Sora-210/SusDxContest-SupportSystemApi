//Import
import { Sequelize } from 'sequelize'
import { queryRoomInOutsTable } from './RoomInOutsMigrate'
import { querySchoolCardsTable } from './SchoolCardsMigrate'
import { queryUsersTable } from './UsersMigrate'

//すべてのテーブルを作成
const allMigrationUp = function(instance:Sequelize) {
    queryRoomInOutsTable.up(instance.getQueryInterface())
    querySchoolCardsTable.up(instance.getQueryInterface())
    queryUsersTable.up(instance.getQueryInterface())
}

//すべてのテーブルを削除
const allMigrationDown = function(instance:Sequelize) {
    queryRoomInOutsTable.down(instance.getQueryInterface())
    querySchoolCardsTable.down(instance.getQueryInterface())
    queryUsersTable.down(instance.getQueryInterface())
}

//########################
export {
    allMigrationUp,
    allMigrationDown,
    queryRoomInOutsTable,
    querySchoolCardsTable,
    queryUsersTable
}