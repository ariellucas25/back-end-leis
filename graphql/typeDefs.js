const { gql } = require('apollo-server');

const typeDefs = gql`
    type Law {
        id: ID
        titulo: String
        descricao: String
        impacto: String
        isFavorite: Boolean
    }

    input LawInput {
        titulo: String
        descricao: String
        impacto: String
        isFavorite: Boolean
    }

    type Query {
        getLaws: [Law]
        getFavoriteLaws: [Law]
        getLaw(ID: ID!): Law!
    }

    type Mutation {
        createLaw(lawInput: LawInput): Law!
        toFavorite(titulo: String): Law!
    }
`;

module.exports = typeDefs;