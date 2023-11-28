const { DataTypes } = require('sequelize');
const {TABLE} = require('../constants');

const MODEL_NAME = "sale"

module.exports = (sequelize) => {
    sequelize.define('sale', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        [TABLE.invoice.foreignKey]:{
            type:DataTypes.INTEGER,
            allowNull:false
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
        }
    },{
        tableName:TABLE[MODEL_NAME].tableName
    });
};
