'use strict'

const SaleModel = require('../models/sales');

async function createOne(data) {
    //TODO: Not implemented
}

async function createMany(data) {
    try {
        let response = await SaleModel.insertMany(data);
        return {
            status: 'Success',
            recordCount: response.length,
            data: response
        };
    }
    catch(err) {
        return {
            status: 'Error' ,
            message: `Data insertion failed with error message: ${err.message}`
        }
    }
}

module.exports = {
    createOne,
    createMany
}