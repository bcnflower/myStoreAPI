const { DataTypes } = require('sequelize');
const {TABLE} = require('../constants');

const MODEL_NAME = "customer"

module.exports = (sequelize) => {
    sequelize.define(MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        contact:{
            type:DataTypes.STRING(30),
            allowNull:false,
        },
        address:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
    },{
        tableName:TABLE[MODEL_NAME].tableName
    });
};
