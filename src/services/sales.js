'use strict'

const SaleModel = require('../models/sales');

async function findAll() {
    try {
        let salesData = await SaleModel.find();
        salesData = salesData.map((item) => { //Data Mapping
            item = item._doc;
            delete item.__v;
            return item;
        });

        return {
            status: 'Success',
            data: salesData 
        };
    }
    catch(err) {
        console.log(err);
        return {
            status: 'Error',
            errorMessage: err
        }
    }
}

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
            status: 'Error',
            errorMessage: err
        }
    }
}

module.exports = {
    findAll,
    createOne,
    createMany
}