const {Datatypes } = require(sequelize)

const sequelize = require("../../config/database");

module.exports = sequelize.define(
    'call_log', {
        user: {
            type: Datatypes.INTEGER,
        },
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Datatypes.INTEGER
        },
        availability: {
            type: Datatypes.STRING
        },
        notes: {
            type: Datatypes.STRING
        },
        transcript: {
            type: Datatypes.STRING
        }
    },
    {
        paranoid: true,
        freezeTableName: true,
        modelName: 'call_log',
    }
)