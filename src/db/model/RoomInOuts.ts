import { Model, DataTypes } from 'sequelize'
import { dbInstance } from '../instance'

class RoomInOuts extends Model {
    public readonly id: number
    public userId: number
    public enterTime: Date
    public leaveTime: Date
    public readonly createdAt: Date
    public readonly updatedAt: Date
}

RoomInOuts.init({
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
},{
    sequelize: dbInstance,
    timestamps: true
})

export { RoomInOuts }