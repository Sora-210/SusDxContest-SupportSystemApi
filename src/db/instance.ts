import { Sequelize } from 'sequelize'
import { allMigrationUp } from './migrate/MigrationAll'
const dbInstance = new Sequelize({
    "username": "root",
    "password": "pass",
    "database": "sdsSystem",
    "host": "localhost",
    "dialect": "sqlite"
})

//Migration
allMigrationUp(dbInstance)

export { dbInstance }