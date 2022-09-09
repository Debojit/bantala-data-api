'use strict'

const SaleModel = require('../models/sales');

function rowMapper(data) {
    if(!data) {
        return undefined;
    }
    
    if(data._id) {// Rename '_id' property
        data = {id: data._id, ...data};
        delete data._id;
    }

    if('__v' in data) {
        delete data.__v; //Remove Mongo document version field
    }

    return data;
}

async function findAll(url, page, size) {
    try {
        let salesData = await SaleModel.find()
                                       .limit(size)
                                       .skip((page - 1) * size)
                                       .exec();
        const totalDocs = await SaleModel.countDocuments();
        salesData = salesData.map((item) => {
            item = rowMapper(item._doc);
            item._links = {
                self: url + '/' + item.id
            }
            return item;
        }); // Data Mapping

        return {
            status: 'Success',
            data: salesData,
            _links : {
                prev: page === 1 ? undefined : `${url}?page=${page - 1}&size=${size}`,
                current: `${url}?page=${page}&size=${size}`,
                next: page * size < totalDocs ? `${url}?page=${+page + 1}&size=${size}` : undefined
            }
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
        
        saleItem = rowMapper(saleItem._doc); // Data Mapping
        saleItem._links = {
            self: url + '/' + saleItem.id
        }
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