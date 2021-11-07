import { QueryInterface, DataTypes } from "sequelize"
const queryRoomInOutsTable = {
    up: (QueryInterface:QueryInterface) => {
        return QueryInterface.createTable('RoomInOuts', {
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
            enterTime: {
                allowNull: false,
                type: DataTypes.DATE
            },
            leaveTime: {
                allowNull: true,
                type: DataTypes.DATE
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
        return QueryInterface.dropTable('RoomInOuts')
    }
}

export { queryRoomInOutsTable }