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
        element = element.replaceAll(' ', '');
        return element.charAt(0).toLowerCase() + element.slice(1);
    });
}

async function getCellData(cell, cellNum) {
    let cellData = {};

    if (cellNum === 1) {//Format Bengali date string to dd-mm-yyyy
        cellData.data = formatBengaliDate(cell.value);
    }
    if(cellNum === 2) {//First English date object to dd-mm-yyyy
        cellData.data = formatEnglishDate(cell.value);
    }

    if(cell.value) {
        if(typeof cell.value === 'object' && 'formula' in cell.value) {//If cell contains formula, get result
            cellData.data = cell.value.result ?? 0;
        }
        else if(typeof cell.value === 'number') {
            cellData.data = cell.value;
        }
    }
    else {
        cellData.data = 0;
    }

    if(cell.note) {//Read and attach cell comments
        let noteData = cell.note.texts[1].text.split('\n');
        noteData.shift();
        cellData.comments = noteData;
    }
    
    return cellData;
}

async function getRowData(headers, row) {
    let rowData = {};
    row.eachCell({ includeEmpty: true }, async (cell, cellNum) => {
        let cellData = await getCellData(cell, cellNum)
        rowData[headers[cellNum - 1]] = cellData;
    });
    return rowData;
}

async function getSheetData(worksheet, headers) {
    let sheetData = [];
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[012])$/;
    
    worksheet.eachRow(async (row, rowNum) => {
        if(typeof row.getCell('A').value === 'string' && dateRegex.test(row.getCell('A').value)) { 
            const rowData = await getRowData(headers, row, rowNum);
            if(rowData.dailyBalance.data !== 0) { //Don't load data for days with no sales & expenditure activity
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

function formatBengaliDate(date) {
    return date.split('-').reverse().join('-')
}

function formatEnglishDate(date) {
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