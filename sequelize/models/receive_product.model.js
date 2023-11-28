const { DataTypes } = require('sequelize');
const {TABLE} = require('../constants');

const MODEL_NAME = "receiveProduct"

module.exports = (sequelize) => {
    sequelize.define(MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        [TABLE.product.foreignKey]:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        quantity:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        unit_price:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        sub_total:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        [TABLE.supplier.foreignKey]:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        date:{
            type:DataTypes.DATE,
            allowNull:false
        },
        [TABLE.user.foreignKey]:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{
        tableName:TABLE[MODEL_NAME].tableName
    });
};
