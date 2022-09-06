'use strict'
const excel = require('exceljs');
const fs = require('fs');

async function uploadFile(req, res) {

}
async function readFile(filePath) {
    const salesFile = new excel.Workbook();
    return salesFile.xlsx.readFile(filePath);
}

async function getHeaders(worksheet) {
    let headers = worksheet.getRow(2).values;
    headers.shift();
    return headers.map((element) => {
        element = element.replace(' ', '')
        return element.charAt(0).toLowerCase() + element.slice(1);
    });
}

async function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if(err) {
            console.log(err);
            throw err;
        }
    });
}

module.exports = {
    uploadFile,
    readFile,
    getHeaders,
    deleteFile
}