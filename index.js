const { gql, ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { QueryDocumentKeys } = require('graphql/language/ast');

const MONGODB = "mongodb+srv://ariel:dev@cluster0.djyfof0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');  

//CREATE SERVER
const server = new ApolloServer({ 
    typeDefs, 
    resolvers 
})

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log('Server running'); 
        return server.listen({port: 5000})
    })
    .then((res) => {
        console.log(`Server is running at ${res.url}`); // Correção aqui
    });
