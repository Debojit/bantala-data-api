'use strict'

const multer = require('multer');

const bulkLoad = require('../services/bulkLoad');

const salesFile = multer({
    storage: multer.diskStorage({
        destination: '/tmp/sales',
        filename: (req, file, cb) => {
            cb(null, file.originalname + '_' + Date.now() + '_' + Math.floor(Math.random() * 10000000));
        }
    })
});

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
        
        bulkLoad.deleteFile(filePath);
        
        res.status(201)
           .json({
                status: 'Success',
                message: `Successfully uploaded data from file ${req.file.originalname}`,
                data: salesData
           });
    }
    catch(err) {
        console.log(typeof err)
        res.status(400)
           .json({
                status: 'Error',
                message: `Upload of file ${req.file.originalname} failed with message: '${err.message}'. Please verify file integrity and try again.`
           });
    }
}

module.exports = {
    salesFile,
    upload
}