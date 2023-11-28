const {TABLE} = require('./constants');

function applyAssociations(sequelize) {
    const { customer, invoice, productCategory, productUnit, product, purchaseOrder, receiveProduct, sale, supplier, user } = sequelize.models;
    // productUnit.belongsTo(product,{targetKey:"unit_id"})
    // product.hasOne(productUnit, { foreignKey: "id" })

    // ##### Product Associations #####
    productUnit.product = productUnit.hasMany(product, { sourceKey: "id",foreignKey: TABLE.productUnit.foreignKey })
    product.productUnit = product.belongsTo(productUnit, { targetKey: "id", foreignKey: TABLE.productUnit.foreignKey })

    productCategory.product = productCategory.hasMany(product, { sourceKey: "id",foreignKey: TABLE.productCategory.foreignKey })
    product.productCategory = product.belongsTo(productCategory, { targetKey: "id", foreignKey: TABLE.productCategory.foreignKey })

    user.product = user.hasMany(product, { sourceKey: "id",foreignKey: TABLE.user.foreignKey })
    product.user = product.belongsTo(user, { targetKey: "id", foreignKey: TABLE.user.foreignKey })


    // ##### Sales Associations #####
    product.sale = product.hasMany(sale, { sourceKey: "id",foreignKey: TABLE.product.foreignKey })
    sale.product = sale.belongsTo(product, { targetKey: "id", foreignKey: TABLE.product.foreignKey })

    invoice.sale = invoice.hasOne(sale, { sourceKey: "id",foreignKey: TABLE.invoice.foreignKey })
    sale.invoice = sale.belongsTo(invoice, { targetKey: "id", foreignKey: TABLE.invoice.foreignKey })


    // ##### Invoice Associations #####
    customer.invoice = customer.hasMany(invoice, { sourceKey: "id",foreignKey: TABLE.customer.foreignKey })
    invoice.customer = invoice.belongsTo(customer, { targetKey: "id", foreignKey: TABLE.customer.foreignKey })

    user.invoice = user.hasMany(invoice, { sourceKey: "id",foreignKey: TABLE.user.foreignKey })
    invoice.user = invoice.belongsTo(user, { targetKey: "id", foreignKey: TABLE.user.foreignKey })

    // ##### Receive Product Associations #####
    supplier.receiveProduct = supplier.hasMany(receiveProduct, { sourceKey: "id",foreignKey: TABLE.supplier.foreignKey })
    receiveProduct.supplier = receiveProduct.belongsTo(supplier, { targetKey: "id", foreignKey: TABLE.supplier.foreignKey })

    product.receiveProduct = product.hasMany(receiveProduct, { sourceKey: "id",foreignKey: TABLE.product.foreignKey })
    receiveProduct.product = receiveProduct.belongsTo(product, { targetKey: "id", foreignKey: TABLE.product.foreignKey })

    user.receiveProduct = user.hasMany(receiveProduct, { sourceKey: "id",foreignKey: TABLE.user.foreignKey })
    receiveProduct.user = receiveProduct.belongsTo(user, { targetKey: "id", foreignKey: TABLE.user.foreignKey })

    // ##### Purchase Order Associations #####
    supplier.purchaseOrder = supplier.hasMany(purchaseOrder, { sourceKey: "id",foreignKey: TABLE.supplier.foreignKey })
    purchaseOrder.supplier = purchaseOrder.belongsTo(supplier, { targetKey: "id", foreignKey: TABLE.supplier.foreignKey })

    product.purchaseOrder = product.hasMany(purchaseOrder, { sourceKey: "id",foreignKey: TABLE.product.foreignKey })
    purchaseOrder.product = purchaseOrder.belongsTo(product, { targetKey: "id", foreignKey: TABLE.product.foreignKey })

    user.purchaseOrder = user.hasMany(purchaseOrder, { sourceKey: "id",foreignKey: TABLE.user.foreignKey })
    purchaseOrder.user = purchaseOrder.belongsTo(user, { targetKey: "id", foreignKey: TABLE.user.foreignKey })
}

module.exports = { applyAssociations };
