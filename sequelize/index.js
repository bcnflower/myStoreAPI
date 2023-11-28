const { Sequelize } = require('sequelize');
const { applyAssociations } = require('./associations')

const sequelize = new Sequelize('test2', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    logQueryParameters: true,
    benchmark: true,
    define: {
        freezeTableName: true,
        timestamps: false
    }
})

const { customer, invoice, product_category, product_unit, product, purchase_order, receive_product, sale, supplier, user } = sequelize.models;
// product.hasMany(product_unit, { sourceKey:"unit_id",foreignKey: "id" })
// product_unit.belongsTo(product)
// const u = sequelize.define('u',{
//     id:{
//         key:true
//     }
// })

const modelDefiners = [
    require('./models/user.model'),
    require('./models/customer.model'),
    require('./models/product.model'),
    require('./models/product_category.model'),
    require('./models/product_unit.model'),
    require('./models/invoice.model'),
    require('./models/sale.model'),
    require('./models/receive_product.model'),
    require('./models/purchase_order.model'),
    require('./models/supplier.model'),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

applyAssociations(sequelize)

module.exports = sequelize;
