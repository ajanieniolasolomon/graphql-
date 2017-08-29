export default {
    Query: {
        allGenres: async(parent, args, { Genres }) => {
            const genres = await Genres.find()
            return genres.map((x) => {

                return x;

            })
        },
        allBooks: async(parent, args, { Books }) => {
            const books = await Books.find()
            return books.map((x) => {

                return x;

            })
        },
    },
    Mutation: {
        createGenres: async(parent, args, { Genres }) => {
            const genre = await new Genres(args).save();


            return genre;


        },
        createBooks: async(parent, args, { Books }) => {
            const book = await new Books(args).save();


            return book;


        }


    },
    Subscription: {

        newBooks: async(parent, args, { book }) => {
            const books = await book.find()
            return books.map((x) => {

                return x;

            })
        }

    }
}