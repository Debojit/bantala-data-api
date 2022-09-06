'use strict'

const multer = require('multer');
const fs = require('fs');

const diskStore = multer.diskStorage({
    destination: '/tmp/sales',
    filename: (req, file, cb) =>{
        cb(null, file.originalname + '_' + Date.now() + '_' + Math.floor(Math.random() * 10000000));
    }
});
const fileUpload = multer({storage: diskStore}).single('salesData');

async function upload(req, res) {
    fileUpload(req, res, (err) => {
        if(err) {
            res.send(err);
        }
        else {
            const filePath = req.file.path;
            fs.unlink(req.file.path, (err) => {
                if(err) {
                    throw err;
                }
            });
            res.json(req.file);
        }
    });
}

module.exports = {
    upload
}