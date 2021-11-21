import { Sequelize } from 'sequelize'
import { allMigrationUp } from './migrate/MigrationAll'
const dbInstance = new Sequelize({
    "username": "root",
    "password": "pass",
    "database": "sdsSystem",
    "host": "db",
    "dialect": "mysql"
})

//Migration
allMigrationUp(dbInstance)

export { dbInstance }