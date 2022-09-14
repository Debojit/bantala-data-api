'use strict'

const apiConfig = require('../configs/api');

async function mapWorksheetToHeaders(worksheet, headerRowIdx = 1) {
    let headers = worksheet.getRow(headerRowIdx).values;
    headers.shift();
    return headers.map((element) => {
        element = element.replaceAll(' ', '');
        return element.charAt(0).toLowerCase() + element.slice(1);
    });
}

async function mapCellToObject(cell, cellNum) {
    let cellData = {};

    if (cellNum === 1) {//Format Bengali date string to dd-mm-yyyy
        cellData = cell.value.split('-').reverse().join('-')
    }
    if(cellNum === 2) {
        cellData = new Date(cell.value);
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

async function mapRowToObject(headers, row) {
    let rowData = {};
    row.eachCell({ includeEmpty: true }, async (cell, cellNum) => {
        if(cellNum === 1) { //Create row id from bengali date
            rowData._id = +cell.value.replaceAll('-', '');
        }
        let cellData = await mapCellToObject(cell, cellNum)
        rowData[headers[cellNum - 1]] = cellData;
    });
    return rowData;
}

async function mapSheetToObject(worksheet, headers) {
    let sheetData = [];
    const bengaliDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[012])$/;
    
    worksheet.eachRow(async (row, rowNum) => {
        if(typeof row.getCell('A').value === 'string' && bengaliDateRegex.test(row.getCell('A').value)) { 
            const rowData = await mapRowToObject(headers, row, rowNum);
            if(rowData.dailyBalance.data !== 0) { //Don't load data for days with no sales & expenditure activity
                sheetData.push(rowData);
            }
        }
    });
    return sheetData;
}

module.exports = {
    mapWorksheetToHeaders,
    mapCellToObject,
    mapRowToObject,
    mapSheetToObject
}