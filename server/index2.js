const express = require('express');

var Busboy = require('busboy');

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const sequelize = require('../sequelize');

const models = sequelize.models;

const { finished } = require('stream/promises');

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    context: {
      models
    },
  });

  await server.start();

  const app = express();
  app.post('/asset',(req,res)=>{
    const busboy = new Busboy({ headers: req.headers });
  })
  app.get('/ip',(req,res)=>{
    let log = "ip"+req.socket.remoteAddress;
    console.log(log)
    res.send(log);
  })
  server.applyMiddleware({ app });

  await new Promise((r) => app.listen({ port: 4000 }, r));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();