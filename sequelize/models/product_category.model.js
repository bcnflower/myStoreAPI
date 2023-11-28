const { DataTypes } = require('sequelize');
const {TABLE} = require('../constants');

const MODEL_NAME = "productCategory"

module.exports = (sequelize) => {
    sequelize.define(MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING(25),
            allowNull:false,
            unique:true
        }
    },{
        tableName:TABLE[MODEL_NAME].tableName
    });
};
