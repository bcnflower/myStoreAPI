const http = require('node:https');
const axios = require('axios').default;
const sequelize = require('./sequelize');

const { customer, invoice, productCategory, productUnit, product, purchaseOrder, receiveProduct, sale, supplier, user } = sequelize.models;

async function main() {

    sequelize.authenticate()
        .then(() => {
            console.log("Authenticated");
        })
        .catch((e) => {
            console.log("Error", e.message);
        })

    // await sequelize.drop();
    // await sequelize.sync({ force: true });
    // await sequelize.sync({ alter: true });

    // await sequelize.models.user.create(
    //     {
    //         username: "test1_" + (new Date().getTime()),
    //         password: "123",
    //         fullname: "test",
    //         type: "user"
    //     }
    // )

    const p1 = await product.findAll({
        limit:1,
        include: [
            productUnit,
            productCategory,
            { model: user, attributes: ['id', 'username'] }
        ]
    });
    p1.forEach(i => console.log(i.toJSON()));
}

// axios.get('https://dummyjson.com/products')
//   .then(async function (response) {
//     // handle success
//     console.log(response.data);
//     const data = response.data;
//     for(const prd of data.products){
//         console.log(prd.category)
//         // productCategory.create({
//         //     name:product.category
//         // })
//         // .then((data)=>{
//         //     console.log("Record Inserted.",data);
//         // })
//         // .catch((e)=>{
//         //     console.log("Error:");
//         // })
//         let unitId = (await productUnit.findOne({where:{name:"Item"}})).toJSON().id;
//         let catId = (await productCategory.findOne({where:{name:prd.category}})).toJSON().id;
//         // console.log(catId)
//         product.create({
//             name:prd.title,
//             code:prd.id,
//             unit_id:unitId,
//             category_id:catId,
//             stock:prd.stock,
//             price:prd.price,
//             discount_percentage:prd.discountPercentage,
//             reorder_level:prd.rating,
//             user_id:1
//         })
//         .then((data)=>{
//             console.log("Record Inserted.",data);
//         })
//         .catch((e)=>{
//             console.log("Error:");
//         })
//     }
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });
main()