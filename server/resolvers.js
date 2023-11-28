const bcrypt = require('bcryptjs');
const { Op,Sequelize } = require('sequelize');
const {createContext, EXPECTED_OPTIONS_KEY} = require('dataloader-sequelize');

const resolvers = {
    Query: {
        async user(root, { id }, ctx, info) {
            // console.log(JSON.stringify(info))
            const { models } = ctx;
            const result = await models.user.findByPk(id, {
                include: [
                    models.product,
                    models.invoice,
                    models.receiveProduct,
                    models.purchaseOrder,
                ]
            });
            ctx.sequelizeDataLoader = createContext(models.product.sequelize);
            ctx.sequelizeDataLoader.prime(result)
            return result;
        },
        async allUser(root, args, ctx) {
            const { models } = ctx;
            const result = await models.user.findAll({
                include: [
                    models.product,
                    models.invoice,
                    models.receiveProduct,
                    models.purchaseOrder,
                ]
            });
            ctx.sequelizeDataLoader = createContext(models.product.sequelize);
            ctx.sequelizeDataLoader.prime(result)
            return result;
        },

        async product(root, { id }, ctx) {
            const { models } = ctx;
            const result = await models.product.findByPk(id, {
                include: [
                    models.user,
                    models.productUnit,
                    models.productCategory,
                ]
            });
            ctx.sequelizeDataLoader = createContext(models.product.sequelize)
            ctx.sequelizeDataLoader.prime(result);
            return result;
        },

        async allProduct(root, args, ctx) {
            const { models } = ctx;
            const result = await models.product.findAll({
                where:{thumbnail:null},
                include: [
                    models.user,
                    models.productUnit,
                    models.productCategory,
                ]
            });
            ctx.sequelizeDataLoader = createContext(models.product.sequelize);
            ctx.sequelizeDataLoader.prime(result)
            return result;
        },

        async searchPoduct(root, {query,page,limit}, ctx) {
            const { models } = ctx;
            const options = {
                include: [
                    models.user,
                    models.productUnit,
                    models.productCategory,
                ]
            }
            const pageInfo = {
                offset:null,
                count:null,
            }
            if(!!query){
                options.where = Sequelize.where(Sequelize.fn('lower',Sequelize.col(`${models.product.getTableName()}.name`)),{
                    [Op.like]:`%${query.replaceAll(/\s+/g,'%')}%`
                })
            }
            if(!!limit && !!page){
                options.limit = limit
                pageInfo.offset = options.offset = (page>0?page-1:0)*limit
            }
            const result = await models.product.findAndCountAll(options);
            ctx.sequelizeDataLoader = createContext(models.product.sequelize);
            ctx.sequelizeDataLoader.prime(result.rows)
            if(!!limit && !!page){
                pageInfo.count = result.count;
            }
            return {
                result: result.rows,
                pageInfo:pageInfo,
            };
        },

        async invoice(root, { id }, { models }) {
            return models.invoice.findByPk(id, {
                include: [
                    models.user,
                    models.customer
                ]
            });
        },

        async allInvoice(root, args, { models }) {
            return models.invoice.findAll({
                include: [
                    models.user,
                    models.customer,
                ]
            });
        },

        async customer(root, { id }, ctx) {
            const { models } = ctx;
            const result = await models.customer.findByPk(id, {
                include: [
                    models.invoice
                ]
            });
            console.log(result.toJSON());
            // ctx.sequelizeDataLoader = createContext(models.product.sequelize);
            // ctx.sequelizeDataLoader.prime(result)
            return result;
        },

        async allCustomer(root, args, ctx) {
            const { models } = ctx;
            const result = await models.customer.findAll({
                include: [
                    models.invoice
                ]
            });
            ctx.sequelizeDataLoader = createContext(models.product.sequelize);
            ctx.sequelizeDataLoader.prime(result)
            return result;
        },

        async sale(root, { id }, { models }) {
            return models.sale.findByPk(id, {
                include: [
                    models.product,
                    models.invoice
                ]
            });
        },

        async allSales(root, args, { models }) {
            return models.sale.findAll({
                include: [
                    models.product,
                    models.invoice
                ]
            });
        },

        async test(root, args, { models }) {
            return "Ok";
        }
    },

    Product: {
        async user(product,args,{sequelizeDataLoader}) {
            return product.getUser({[EXPECTED_OPTIONS_KEY]:sequelizeDataLoader});
        }
    },

    User:{
        async products(user,args,{sequelizeDataLoader}) {
            return user.getProducts({[EXPECTED_OPTIONS_KEY]:sequelizeDataLoader});
        },
    },

    // Customer:{
    //     async invoice(customer,args,{sequelizeDataLoader}) {
    //         return customer.getInvoices({[EXPECTED_OPTIONS_KEY]:sequelizeDataLoader});
    //     },
    // },

    Mutation: {
        async createUser(root, { username, fullname, password, type, designation, contact }, { models }) {
            return models.user.create(
                {
                    username,
                    fullname,
                    password,//await bcrypt.hash(password, 10),
                    type,
                    designation,
                    contact
                }
            )
        },
        async createProduct(root, { code, thumbnail, name, unit_id, category_id, stock, price, discount_percentage, user_id, reorder_level }, { models }) {
            return models.product.create(
                {
                    code,
                    thumbnail,
                    name,
                    unit_id,
                    category_id,
                    stock,
                    price,
                    discount_percentage,
                    user_id,
                    reorder_level,
                }
            )
        },

        async updateProduct(root, { id, ...args }, { models }) {
            return models.product.update(
                args,
                {
                    where: { id: id },
                }
            )
        },


        async createCustomer(root, { code,name,contact,address }, { models }) {
            return models.customer.create(
                {
                    code,
                    name,
                    contact,
                    address
                }
            )
        },

        async createInvoice(root, { customer_id,payment_type,total_amount,amount_tendered,bank_account_name,bank_account_number,date,user_id }, { models }) {
            return models.invoice.create(
                {
                    customer_id,
                    payment_type,
                    total_amount,
                    amount_tendered,
                    bank_account_name,
                    bank_account_number,
                    date,
                    user_id,
                }
            )
        },

        async createSale(root, { invoice_id,product_id,quantity,unit_price,sub_total }, { models }) {
            return models.sale.create(
                {
                    invoice_id,
                    product_id,
                    quantity,
                    unit_price,
                    sub_total
                }
            )
        }
    }
};

module.exports = resolvers;