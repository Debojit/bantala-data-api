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
    const filePath = req.file.path;
    const salesWorkbook = await bulkLoad.readFile(filePath);
    const headers = await bulkLoad.getHeaders(salesWorkbook.worksheets[0]);
    res.json(headers);
}

module.exports = {
    salesFile,
    upload
}