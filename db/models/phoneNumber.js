'use strict';
const { DataTypes } = require('sequelize');

const sequelize = require('../../config/database');
const AppError = require('../../utils/appError');

const phoneNumbers = sequelize.define(
    'PhoneNumber',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Phone number cannot be null' },
                notEmpty: { msg: 'Phone number cannot be empty' },
                isValidFormat() {
                  if (this.phoneNumber.length < 10) {
                    throw new AppError('Enter a valid phone number', 400);
                  }
                }
            }
        },
        ownedBy: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        paranoid: true,
        freezeTableName: true,
    }
);

module.exports = phoneNumbers;