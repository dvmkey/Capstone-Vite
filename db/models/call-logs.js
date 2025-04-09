'use strict';
const { DataTypes } = require('sequelize');

const sequelize = require("../../config/database");

const callLogs = sequelize.define(
    'call-logs', {
        user: {
            allowNull: false,
            type: DataTypes.INTEGER
          },
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
          },
          scammerName: {
            type: DataTypes.STRING
          },
          scammerDeal: {
            type: DataTypes.STRING
          },
          specialNotes: {
            type: DataTypes.STRING
          },
          callStart: {
            type: DataTypes.DATE
          },
          callEnd: {
            type: DataTypes.DATE
          },
          fullTranscript: {
            type: DataTypes.STRING
          },
          deletedAt: {
            type: DataTypes.DATE
          },
    },
    {
        paranoid: true,
        freezeTableName: true,
        modelName: 'call-logs',
        timestamps: true,
    }
)

module.exports = callLogs;