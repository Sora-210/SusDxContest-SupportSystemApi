import { Model, DataTypes } from 'sequelize'
import { dbInstance } from '../instance'

class SchoolCards extends Model {
    public id: String
    public userId: number
    public readonly createdAt: Date
    public readonly updatedAt: Date
}

SchoolCards.init({
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
},{
    sequelize: dbInstance,
    timestamps: true
})

export { SchoolCards }