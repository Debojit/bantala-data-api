'use strict'

const SaleModel = require('../models/sales');

const salesMapper = require('../mapping/sales')

async function findAll(url, page, size) {
    try {
        let salesData = await SaleModel.find()
                                       .limit(size)
                                       .skip((page - 1) * size)
                                       .exec();
        const totalDocs = await SaleModel.countDocuments();
        salesData = salesData.map((item) => {
            item = salesMapper.mapModelToFindResponse(item._doc);
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
        if(saleItem) {
            saleItem = salesMapper.mapModelToFindResponse(saleItem._doc); // Data Mapping
            saleItem._links = {
                self: url + '/' + saleItem.id
            }
            return {
                status: 'Success',
                data: saleItem
            };
        }
        else {
            return {
                status: 'Failure'
            }
        }
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
        data = data.map((element) => salesMapper.mapCreateRequestToModel(element));
        
        let response = await SaleModel.insertMany(data);
        return {
            status: 'Success',
            recordCount: response.length,
            data: response  
        };
    }
    catch(err) {
        console.log(err)
        if(err instanceof TypeError) {
            return {
                status: 'Error',
                    errorMessage: err.message
            };
        }
        else { // Catchall error
            return {
                status: 'Error',
                    errorMessage: 'Error creating sales data records. Please refer the logs for details.'
            };
        }
    }
}

module.exports = {
    findAll,
    findById,
    createOne,
    createMany
}