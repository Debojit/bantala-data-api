'use strict'
const excel = require('exceljs');
const fs = require('fs');

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

async function getHeaders(worksheet, headerRowIdx = 1) {
    let headers = worksheet.getRow(headerRowIdx).values;
    headers.shift();
    return headers.map((element) => {
        element = element.replaceAll(' ', '')
        return element.charAt(0).toLowerCase() + element.slice(1);
    });
}

async function getSheetData(worksheet, headers) {
    let sheetData = [];
    worksheet.eachRow((row, rowNum) => {
        let rowValues = row.values;
        
        rowValues.shift();//Remove first empty element
        rowValues = Array.from(rowValues, itm => itm || 0); //Replace other empty elements with zero
        
        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        if(typeof rowValues[0] === 'string' && dateRegex.test(rowValues[0])) {
            let rowData = {};

            //Format dates to DD-MM-YYYY string
            rowValues[0] = formatDate(rowValues[0]);
            rowValues[1] = formatDate(rowValues[1]);
            
            headers.forEach((header, idx) => {
                //If cell has formula, get its value and substitute
                if (typeof rowValues[idx] === 'object' && 'formula' in rowValues[idx]) {
                    rowValues[idx] = 'result' in rowValues[idx] ? rowValues[idx].result : 0;
                }
                rowData[header] = rowValues[idx];
            });
            
            if(rowData.cumulativeTotal !== 0) { //Skip dates for which there is no data
                sheetData.push(rowData);
            }
        }
    });
    return sheetData;
}

async function getData(salesWorkbook) {
    const headers = await getHeaders(salesWorkbook.worksheets[0], 2);
    let data = [];
    salesWorkbook.eachSheet(async (worksheet) => {
        let sheetData = await getSheetData(worksheet, headers);
        data.push(...sheetData);
    });
    return data;
}

function formatDate(date) {
    date = new Date(date);
    let dateStr = date.toLocaleDateString('en-IN');
    let dateVal = dateStr.split('/');
    dateVal[0] = +dateVal[0] < 10 ? '0' + dateVal[0] : dateVal[0];
    dateVal[1] = +dateVal[1] < 10 ? '0' + dateVal[1] : dateVal[1];
    return dateVal.join('-');
}
module.exports = {
    readFile,
    deleteFile,
    getData,
}