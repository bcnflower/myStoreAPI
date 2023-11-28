const { DataTypes } = require('sequelize');
const {TABLE} = require('../constants');

const MODEL_NAME = "product"

module.exports = (sequelize) => {
    sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        code: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        thumbnail: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        [TABLE.productUnit.foreignKey]: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        [TABLE.productCategory.foreignKey]: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        discount_percentage: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        reorder_level: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        [TABLE.user.foreignKey]: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: sequelize.models.user,
            //     key: 'id'
            // }
        }
    },{
        tableName:TABLE[MODEL_NAME].tableName
    });
};
