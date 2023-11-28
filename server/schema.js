const { TABLE } = require('../sequelize/constants');
const { gql } = require('apollo-server');

const typeDefs = gql`
  
  input UserInput{
    id: Int!
    username: String!
    fullname: String!
    designation:Int
    contact:String
    type:String
  }
  
  type User {
    id: Int!
    username: String!
    fullname: String!
    designation:Int
    contact:String
    type:String

    products:[Product!]
    invoices:[Invoice!]
    purchaseOrders:[PurchaseOrder!]
    receiveProducts:[ReceiveProduct!]
  }

  type Product {
    id:Int!
    code:String!
    thumbnail:String
    name:String!
    unit_id:Int!
    category_id:Int!
    stock:Float!
    price:Float!
    discount_percentage:Float!
    user_id:Int!
    reorder_level:Int!

    user:User!
    productUnit:ProductUnit!
    productCategory:ProductCategory!    
  }

  type Invoice{
    id:Int!
    customer_id:Int!
    payment_type:AllowedPaymentTypes!
    total_amount:Float!
    amount_tendered:Float!
    bank_account_name:String!
    bank_account_number:String!
    date:String!
    user_id:Int!

    customer:Customer!
  }

  type PurchaseOrder{
    id:Int!
    product_id:Int!
    quantity:Float!
    unit_price:Float!
    sub_total:Float!
    supplier_id:Int!
    date:String!
    user_id:Int!
  }

  type ReceiveProduct{
    id:Int!
    product_id:Int!
    quantity:Float!
    unit_price:Float
    sub_total:Float
    supplier_id:Int!
    date:String!
    user_id:Int!
  }

  type ProductUnit{
    id:Int!
    name:String!
  }

  type ProductCategory{
    id:Int!
    name:String!
  }

  type Customer{
    id:Int!
    code:String!
    name:String!
    contact:String!
    address:String!

    invoices:[Invoice!]!  
  }

  type Sale{
    id:Int!
    invoice_id:Int!
    product_id:Int!
    quantity:Int!
    unit_price:Float!
    sub_total:Float!
  }

  type PageInfo{
    offset:Int!
    count:Int!
  }

  type SearchResult{
    result:[Product!]!
    pageInfo:PageInfo!
  }

  type Query {
    user(id: Int!): User
    allUser: [User!]!
    product(id:Int!): Product
    allProduct:[Product!]!
    searchPoduct(query:String,page:Int = 1,limit:Int = 10):SearchResult!
    invoice(id:Int!): Invoice
    allInvoice:[Invoice!]!
    customer(id:Int!): Customer
    allCustomer:[Customer!]!
    sale(id: Int!): Sale
    allSales:[Sale!]!
    test: String
  }

  type Mutation{
    createUser(
        username:String!,
        fullname:String!,
        password:String!,
        type:AllowedUserTypes!,
        designation:String,
        contact:String
    ): User!

    createProduct(
        code:String!
        thumbnail:String
        name:String!
        unit_id:Int!
        category_id:Int!
        stock:Float!
        price:Float!
        discount_percentage:Float!
        user_id:Int!
        reorder_level:Int!
    ):Product!

    updateProduct(
        id:Int!
        code:String
        thumbnail:String
        name:String
        unit_id:Int
        category_id:Int
        stock:Float
        price:Float
        discount_percentage:Float
        user_id:Int
        reorder_level:Int
    ):[Int]

    createInvoice(
        customer_id:Int!
        payment_type:AllowedPaymentTypes!
        total_amount:Float!
        amount_tendered:Float!
        bank_account_name:String!
        bank_account_number:String!
        date:String!
        user_id:Int!
    ):Invoice!

    createCustomer(
        code:String!
        name:String!
        contact:String!
        address:String!
    ):Customer!

    createSale(
        invoice_id:Int!
        product_id:Int!
        quantity:Int!
        unit_price:Float!
        sub_total:Float!
    ):Sale!
  }

  enum AllowedUserTypes{
    admin
    user
  }

  enum AllowedPaymentTypes{
    cash
    credit
  }
`;

module.exports = typeDefs;