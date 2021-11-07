import { Model, DataTypes } from 'sequelize'
import { dbInstance } from '../instance'

class Users extends Model {
    public readonly id: number
    public name: String
    public schoolId: String
    public readonly createdAt: Date
    public readonly updatedAt: Date
}

Users.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    schoolId: {
        allowNull: true,
        type: DataTypes.STRING
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

export { Users }