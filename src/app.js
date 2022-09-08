'use strict'

const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const salesRouter = require('./routes/sales');

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