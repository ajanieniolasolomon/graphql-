import express from 'express';

import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './schema';
import resolvers from './resolvers';
import mongoose from 'mongoose';
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
var bookSchema = {
    title: {
        type: String,
        required: true
    },
    genres: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: Number,
        required: true
    },
    pages: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
};
var cors = require('cors');



mongoose.connect('mongodb://localhost/bookstore');
var Genres = mongoose.model('Genres', { name: String });
var Books = mongoose.model('Books', bookSchema);

const PORT = 3000;
const app = express();
var cors = require('cors');
//app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accept', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Request-Method", "GET,POST");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return next();
});
const helperMiddleware = [
    bodyParser.json(),
    bodyParser.text({ type: 'application/json' }),
    (req, res, next) => {
        if (req.is('application/json')) {
            req.body = { query: req.body };
        }
        next();
    }
];



app.use('/graphql', helperMiddleware, graphqlHttp({ schema, context: { Genres, Books } }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(3000);