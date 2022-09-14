'use strict'

const apiConfig = require('../configs/api')
const uploadService = require('../services/sales.upload');
const salesService = require('../services/sales');

async function allSales(req, res) {
    try {
        const rootUrl = `${req.protocol}://${req.hostname}:${process.env.APP_PORT}/sales`;
        const size = req.query.size ?? apiConfig.defaultPageSize;
        const page = req.query.page ?? apiConfig.defaultPage;

        let response = await salesService.findAll(rootUrl, +page, +size);
        if(response.status === 'Success') {
            if(response.data.length > 0) {
                res.status(200)
               .json(response);
            }
            else {
                res.sendStatus(204);
            }
        }
        else {
            throw response.errorMessage.err;
        }
    }
    catch(err) {
        console.log(err);
        res.status(500)
           .json({
                status: 'Error',
                message: `Sales record search failed with error '${err}'`
           });
    }
}

async function getSale(req, res) {
    try {
        let saleId = +req.params.id;
        const rootUrl = `${req.protocol}://${req.hostname}:${process.env.APP_PORT}/sales`;
        if (isNaN(saleId)) { // Parameter validation; must be number
            res.status(400)
               .json({
                        status: 'Error',
                        message: `Invalid parameter '${req.params.id}', must be a valid positive Number or string representation of the same.`
                });
        }
        else {
            let saleItem = await salesService.findById(rootUrl, saleId);
            if(!saleItem.data) {
                res.sendStatus(404);
            }
            else {
                res.status(200)
                   .json(saleItem);
            }
        }
    } catch(err) {
        console.log(err);
        res.status(500)
           .json({
                status: 'Error',
                message: `Sales record search failed with error '${err}'`
           });
    }
}

async function createSalesItems(req, res) {
    try {
        if(req.body.constructor.name === 'Object') {
            //Call create one service
        }
        else if (req.body.constructor.name === 'Array') {
            //Validate Req Body
            let response = await salesService.createMany(req.body);

            if(response.status === 'Success') {
                res.status(201)
                .json({
                        status: 'Success',
                        data: response.data
                });
            }
            else {
                res.status(400)
                .json({
                        status: response.status,
                        message: response.errorMessage
                });
            }
        }
        else {
            res.status(400)
               .json({
                    status: 'Error',
                    message: 'Invalid request body. Can be only be valid JSON objects or an array of objects.'
               });
        }
    }
    catch(err) {
        console.log(err);
        res.status(500)
           .json({
                status: 'Error',
                message: `Sales record creation failed with error '${err}'`
           });
    }
}

async function upload(req, res) {
    try {
        if(!req.file) {
            res.status(400)
            .json({
                status: 'Error',
                message: 'No file specified.'
            });
        }
        const filePath = req.file.path;
        const salesWorkbook = await uploadService.readFile(filePath);
        const salesData = await uploadService.getData(salesWorkbook);
        
        uploadService.deleteFile(filePath); //Data loaded from file, deleting....

        let response = await salesService.createMany(salesData);
        if(response.status === 'Success') {
            res.status(201)
               .json({
                       status: 'Success',
                       message: `${response.recordCount} records successfully loaded from file '${req.file.originalname}'`
               });
        }
        else {
            res.status(500)
               .json({
                       status: 'Error',
                       message: response.errorMessage.message
               });
        }
    }
    catch(err) {
        console.log(err);
        res.status(500)
           .json({
                status: 'Error',
                message: `Upload of file ${req.file.originalname} failed with message: '${err.message}'.`
           });
    }
}

module.exports = {
    allSales,
    getSale,
    createSalesItems,
    upload
}