const Movie = require('./models/Movie');

const resolvers = {
    Query: {
        getMovies: async () => await Movie.find(),
        getMovieById: async (_, { id }) => await Movie.findById(id),
    },
    Mutation: {
        addMovie: async (_, { title, director, production_house, release_date, genre, rating }) => {
            const newMovie = new Movie({ title, director, production_house, release_date, genre, rating });
            await newMovie.save();
            return newMovie;
        },
        updateMovie: async (_, { id, ...updates }) => {
            return await Movie.findByIdAndUpdate(id, updates, { new: true });
        },
        deleteMovie: async (_, { id }) => {
            await Movie.findByIdAndDelete(id);
            return 'Movie deleted successfully';
        }
    }
};

module.exports = resolvers;
