const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define(
  'preferences',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    voice: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
    prompt: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
    ownedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user', // Make sure this matches the actual table name
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
  },
  {
    paranoid: true,
    freezeTableName: true,
  }
);
