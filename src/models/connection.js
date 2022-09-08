'use strict'

const mongoose = require('mongoose');

const connectionStr = `mongodb+srv://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

let connection = mongoose.createConnection(connectionStr, options);

connection.on('open', () => {
    console.log(`Connected to MongoDB at ${process.env.DB_HOST}`);
});

connection.on('disconnected', () => {
    connection = mongoose.createConnection(connectionStr, options);
});

connection.on('error', (err) => {
    console.log(`MongoDB connection error: ${err}`);
});

module.exports = connection;