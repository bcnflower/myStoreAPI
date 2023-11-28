const { DataTypes } = require('sequelize');
const {TABLE} = require('../constants');

const MODEL_NAME = "invoice"

module.exports = (sequelize) => {
    sequelize.define(MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        [TABLE.customer.foreignKey]:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        payment_type:{
            type:DataTypes.ENUM(['cash','credit'])
        },
        total_amount:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        amount_tendered:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        bank_account_name:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        bank_account_number:{
            type:DataTypes.STRING(25),
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
