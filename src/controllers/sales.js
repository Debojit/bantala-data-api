'use strict'

const multer = require('multer');

const {apiConfig} = require('../configs/api')
const bulkLoad = require('../services/bulkLoad');
const salesService = require('../services/sales');

const salesFile = multer({
    storage: multer.diskStorage({
        destination: '/tmp/sales',
        filename: (req, file, cb) => {
            cb(null, file.originalname + '_' + Date.now() + '_' + Math.floor(Math.random() * 10000000));
        }
    })
});

async function allSales(req, res) {
    try {
        const limit = req.query.limit || apiConfig.defaultPageSize;
        const skip = req.query.skip || apiConfig.defaultSkipValue;
        let response = await salesService.findAll(limit, skip);
        if(response.status === 'Success') {
            if(response.data.length > 0) {
                res.status(200)
               .json({
                    status: 'Success',
                    data: response.data
               });
            }
            else {
                res.status(204)
                   .end();
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
        const salesWorkbook = await bulkLoad.readFile(filePath);
        const salesData = await bulkLoad.getData(salesWorkbook);
        
        bulkLoad.deleteFile(filePath); //Data loaded from file, deleting....

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
                       status: 'Success',
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
    salesFile,
    upload
}