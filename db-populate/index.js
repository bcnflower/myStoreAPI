const sequelize = require('../sequelize');
const { pickRandom,randomDate} = require('./helper');
const { faker, fa } = require('@faker-js/faker');

const { customer, invoice, productCategory, productUnit, product, purchaseOrder, receiveProduct, sale, supplier, user } = sequelize.models;

async function main() {

    sequelize.authenticate()
        .then(() => {
            console.log("Authenticated");
        })
        .catch((e) => {
            console.log("Error", e.message);
        })

    await sequelize.drop();
    await sequelize.sync({ alter: true });

    await user.bulkCreate(
        Array(1000).fill(0).map(i => (
            {
                username: faker.internet.userName(),
                password: faker.internet.password(),
                fullname: faker.person.fullName(),
                type: "user"
            }
        ))
    )

    // Product Units
    let newUnitData = []
    for(let i = 0;i<1000;i++){
        const category = faker.science.unit().name
        if( newUnitData.includes(category)){
            continue;
        }
        newUnitData.push(category)
    }
    const currentUnitData = (await productUnit.findAll()).map(r=>r.toJSON().name)
    newUnitData = newUnitData.filter(u=>(!currentUnitData.includes(u)))
    await productUnit.bulkCreate(
        newUnitData.map(i=>({name:i}))
    )
    
    // Product Category
    let newCategoryData = []
    for(let i = 0;i<1000;i++){
        const category = faker.commerce.productAdjective()
        if( newCategoryData.includes(category)){
            continue;
        }
        newCategoryData.push(category)
    }
    for(let i = 0;i<1000;i++){
        const category = faker.commerce.productMaterial()
        if( newCategoryData.includes(category)){
            continue;
        }
        newCategoryData.push(category)
    }
    const currentCategoryData = (await productCategory.findAll()).map(r=>r.toJSON().name)
    newCategoryData = newCategoryData.filter(c=>(!currentCategoryData.includes(c)))
    await productCategory.bulkCreate(
        newCategoryData.map(i=>({name:i}))
    )

    // Products
    const dbUsers = await user.findAll();
    const dbProductUnits = await productUnit.findAll();
    const dbProductCategory = await productCategory.findAll();

    await product.bulkCreate(
        Array(1000).fill(0).map(i => (
            {
                code:faker.string.nanoid(),
                name:faker.commerce.product(),
                unit_id:pickRandom(dbProductUnits).toJSON().id,
                category_id:pickRandom(dbProductCategory).toJSON().id,
                stock:faker.number.int({min:10,max:1000}),
                price:faker.number.float({min:10,max:1000}),
                discount_percentage:faker.number.float({min:1,max:10}),
                user_id: pickRandom(dbUsers).toJSON().id,
                reorder_level:faker.number.int({min:0,max:10}),
            }
        ))
    )

    await customer.bulkCreate(
        Array(1000).fill(0).map(i => (
            {
                code:faker.string.nanoid(),
                name:faker.person.fullName(),
                contact:faker.phone.number(),
                address:faker.location.streetAddress(),
            }
        ))
    )

    
    const dbCustomers = await customer.findAll();
    await invoice.bulkCreate(
        Array(1000).fill(0).map(i => (
            {
                customer_id:pickRandom(dbCustomers).toJSON().id,
                payment_type:pickRandom(["cash","credit"]),
                total_amount:faker.number.float({min:10,max:1000}),
                amount_tendered:faker.number.float({min:10,max:1000}),
                bank_account_name:faker.finance.accountName(),
                bank_account_number:faker.finance.accountNumber(),
                date:faker.date.past(),
                user_id:pickRandom(dbUsers).toJSON().id,
            }
        ))
    )

        
    const dbInvoices = await invoice.findAll();
    const dbProductss = await product.findAll();
    await sale.bulkCreate(
        Array(1000).fill(0).map(i => {
            let quantity = faker.number.int({min:1,max:50});
            let unit_price = faker.number.float({min:10,max:1000})
            let sub_total = quantity * unit_price;
            return (
                {
                    invoice_id:pickRandom(dbInvoices).toJSON().id,
                    product_id:pickRandom(dbProductss).toJSON().id,
                    quantity:quantity,
                    unit_price:unit_price,
                    sub_total:sub_total
                }
            )
        })
    )

    


}

main()