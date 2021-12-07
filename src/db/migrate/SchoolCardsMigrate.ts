import { QueryInterface, DataTypes } from "sequelize"
const querySchoolCardsTable = {
    up: (QueryInterface:QueryInterface) => {
        return QueryInterface.createTable('SchoolCards', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING
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