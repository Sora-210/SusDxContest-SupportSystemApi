import { QueryInterface, DataTypes } from "sequelize"
const querySchoolCardsTable = {
    up: (QueryInterface:QueryInterface) => {
        return QueryInterface.createTable('SchoolCards', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        })
    },
    down: (QueryInterface:QueryInterface) => {
        return QueryInterface.dropTable('SchoolCards')
    }
}

export { querySchoolCardsTable }