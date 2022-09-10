'use strict'

const apiConfig = require('../../configs/api');

async function validateRequestPayload(data) {
    let validationStatus = [];
    let validationMessage = {};

    //Bengali Date
    if('bengaliDate' in data) {
        data.bengaliDate = data.bengaliDate ?? 'NA';
        if(data.bengaliDate === 'NA') {
            validationMessage.fieldName = 'bengaliDate';
            validationMessage.message = 'Field \'bengaliDate\' is mandatory';
            validationStatus.push(validationMessage);
        }
        if(!apiConfig.bengaliDateRegex.createSales.test(data.bengaliDate)) {
            validationMessage.fieldName = 'bengaliDate';
            validationMessage.message = 'Data in \'bengaliDate\' must be of the form DD-MM-YYYY, e.g. 01-01-1429';
            validationStatus.push(validationMessage);
        }
    }
    else {
        validationMessage.fieldName = 'bengaliDate';
        validationMessage.message = 'Field \'bengaliDate\' is mandatory';
        validationStatus.push(validationMessage);
    }

    //English Date
    if('englishDate' in data) {
        data.bengaliDate = data.bengaliDate ?? 'NA';
        if(data.bengaliDate === 'NA') {
            validationMessage.fieldName = 'englishDate';
            validationMessage.message = 'Field \'englishDate\' is mandatory';
            validationStatus.push(validationMessage);
        }
        if(!apiConfig.bengaliDateRegex.createSales.test(data.bengaliDate)) {
            validationMessage.fieldName = 'englishDate';
            validationMessage.message = 'Data in \'englishDate\' must be of the form YYYY-MM-DD, e.g. 1429-01-01';
            validationStatus.push(validationMessage);
        }
    }
    else {
        validationMessage.fieldName = 'englishDate';
        validationMessage.message = 'Field \'englishDate\' is mandatory';
        validationStatus.push(validationMessage);
    }
    //Sales
    //Guard Deposit
    //Other Cash
    //Net Daily Income
    //Daily Expense
    //Other Deductions
    //Total Deductions
    //Daily Balance
    //Cumulative Total

    return validationStatus;
}

module.exports = validateRequestPayload;