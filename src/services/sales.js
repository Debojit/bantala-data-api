'use strict'

const SaleModel = require('../models/sales');

function rowMapper(url, data) {
    if(!data) {
        return undefined;
    }
    
    if(data._id) {// Rename '_id' property
        data.id = data._id;
        delete data._id;
    }

    if('__v' in data) {
        delete data.__v; //Remove Mongo document version field
    }
    
    if(url) { // Add urls
        data._links = {
            self: url + '/' + data._id
        }
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

async function findById(url, id) {
    try {
        let saleItem = await SaleModel.findById(id)
                                       .exec();
        
        saleItem = rowMapper(url, saleItem._doc); // Data Mapping
        
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