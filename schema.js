const { gql } = require('graphql-tag');

const typeDefs = gql`
    type Movie {
        id: ID!
        title: String!
        director: String!
        production_house: String!
        release_date: String!
        genre: String!
        rating: Float!
        createdAt: String
        updatedAt: String
    }

    type Query {
        getMovies: [Movie]
        getMovieById(id: ID!): Movie
    }

    type Mutation {
        addMovie(title: String!, director: String!, production_house: String!, release_date: String!, genre: String!, rating: Float!): Movie
        updateMovie(id: ID!, title: String, director: String, production_house: String, release_date: String, genre: String, rating: Float): Movie
        deleteMovie(id: ID!): String
    }
`;

module.exports = typeDefs;
