const { DataTypes } = require('sequelize');
const {TABLE} = require('../constants');

const MODEL_NAME = "productUnit"

module.exports = (sequelize) => {
    sequelize.define(MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING(20),
            allowNull:false,
            unique:true
        }
    },{
        tableName:TABLE[MODEL_NAME].tableName
    });
};
