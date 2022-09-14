'use strict'

const excel = require('exceljs');
const fs = require('fs');

const uploadMapper = require('../mapping/sales.upload')

async function readFile(filePath) {
    const salesFile = new excel.Workbook();
    return salesFile.xlsx.readFile(filePath);
}

async function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if(err) {
            console.log(err);
            throw err;
        }
    });
}

async function getData(salesWorkbook) {
    const headers = await uploadMapper.mapWorksheetToHeaders(salesWorkbook.worksheets[0], 2);
    let data = [];
    salesWorkbook.eachSheet(async (worksheet) => {
        let sheetData = await uploadMapper.mapSheetToObject(worksheet, headers);
        data.push(...sheetData);
    });
    return data;
}

module.exports = {
    readFile,
    deleteFile,
    getData,
}