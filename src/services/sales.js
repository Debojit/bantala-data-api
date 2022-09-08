'use strict'

const SaleModel = require('../models/sales');

function rowMapper(data) {
    if(!data) {
        return undefined;
    }
    
    if('__v' in data) {
        delete data.__v; //Remove Mongo document version field.
    }
    
    return data;
}

async function findAll(limit, skip) {
    try {
        let salesData = await SaleModel.find()
                                       .limit(limit)
                                       .skip(skip)
                                       .exec();
        salesData = salesData.map((item) => rowMapper(item._doc)); // Data Mapping

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
        };
    }
}

async function findById(id) {
    try {
        let saleItem = await SaleModel.findById(id)
                                       .exec();
        
        saleItem = rowMapper(saleItem._doc); // Data Mapping
        
        return {
            status: 'Success',
            data: saleItem
        };
    }
    catch(err) {
        console.log(err);
        return {
            status: 'Error',
            errorMessage: err
        };
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
        };
    }
}

module.exports = {
    findAll,
    findById,
    createOne,
    createMany
}