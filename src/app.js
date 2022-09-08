'use strict'

const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const salesRouter = require('./routes/sales');

const dbConfig = require('./configs/db.config')
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.connectionStr, dbConfig.options)
    .then(() => {
        console.log('Successfully connected to the database.');
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

const port = process.env.APP_PORT || 3000;
const app = express();

app.use('/sales', salesRouter);

app.listen(port, (err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log(`App running on ${port}`)
    }
})