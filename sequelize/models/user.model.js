const { DataTypes } = require('sequelize');
const {TABLE} = require('../constants');

const MODEL_NAME = "user"

module.exports = (sequelize) => {
    sequelize.define(MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        fullname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        designation: {
            type: DataTypes.INTEGER(1),
        },
        contact: {
            type: DataTypes.STRING(15),
        },
        type: {
            type: DataTypes.ENUM(['admin', 'user']),
            allowNull: false
        }
    },{
        tableName:TABLE[MODEL_NAME].tableName
    });
};
