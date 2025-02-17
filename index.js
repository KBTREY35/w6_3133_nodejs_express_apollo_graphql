const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const dotenv = require('dotenv');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

dotenv.config();

const mongodb_atlas_url = process.env.MONGODB_URL || "mongodb://localhost:27017/moviesDB";

const connectDB = async () => {
    try {
        await mongoose.connect(mongodb_atlas_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Success: MongoDB connected');
    } catch (error) {
        console.error('Error: MongoDB connection failed', error);
    }
};

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use('/graphql', expressMiddleware(server));

    connectDB();

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}/graphql`);
    });
}

startApolloServer();
