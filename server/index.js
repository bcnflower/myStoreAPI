const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const sequelize = require('../sequelize');
const models = sequelize.models;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { 
    models
   },
});

server
  .listen({port:4001})
  .then(({ url }) => console.log('Server is running on localhost:4001'));