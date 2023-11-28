const { DataTypes } = require('sequelize');
const {TABLE} = require('../constants');

const MODEL_NAME = "supplier"

module.exports = (sequelize) => {
    sequelize.define('supplier', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code:{
            type:DataTypes.STRING(15),
            allowNull:false
        },
        name:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        contact:{
            type:DataTypes.STRING(15),
            allowNull:false
        },
        address:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        email:{
            type:DataTypes.STRING(50),
            allowNull:false
        }   
    },{
        tableName:TABLE[MODEL_NAME].tableName
    });
};
