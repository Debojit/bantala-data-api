'use strict'

const apiConfig = require('../../configs/api');

async function validateRequestPayload(data) {
    let validationStatus = [];
    let validationMessage = {};

    //Bengali Date
    const bengaliDateRegex = /^(0[1-9]|[12][0-9]|3[012])-(0[1-9]|1[0-2])-\d{4}$/;
    if('bengaliDate' in data) {
        data.bengaliDate = data.bengaliDate ?? 'NA';
        if(data.bengaliDate === 'NA') {
            validationMessage.fieldName = 'bengaliDate';
            validationMessage.message = 'Field \'bengaliDate\' is mandatory';
            validationStatus.push(validationMessage);
        }
        if(!bengaliDateRegex.test(data.bengaliDate)) {
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
    const englishDateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if('englishDate' in data) {
        data.englishDate = data.englishDate ?? 'NA';
        if(data.englishDate === 'NA') {
            validationMessage.fieldName = 'englishDate';
            validationMessage.message = 'Field \'englishDate\' is mandatory';
            validationStatus.push(validationMessage);
        }
        if(!englishDateRegex.test(data.englishDate)) {
            validationMessage.fieldName = 'englishDate';
            validationMessage.message = 'Data in \'englishDate\' must be of the form DD-MM-YYYY, e.g. 12-04-2021';
            validationStatus.push(validationMessage);
        }
    }
    else {
        validationMessage.fieldName = 'englishDate';
        validationMessage.message = 'Field \'englishDate\' is mandatory';
        validationStatus.push(validationMessage);
    }

    //Sales
    const salesRegex = /\d{1,10}[\.\d{2}]*/;
    if('sales' in data) {
        data.sales = data.sales ?? 'NA';
        if(data.sales === 'NA') {
            validationMessage.fieldName = 'sales';
            validationMessage.message = 'Field \'englishDate\' is mandatory';
            validationStatus.push(validationMessage);
        }
        if(!salesRegex.test(data.sales)) {
            validationMessage.fieldName = 'sales';
            validationMessage.message = 'Data in \'sales\' must be a valid 10-digit number with exactly two decimal values. e.g. 9999999999.99';
            validationStatus.push(validationMessage);
        }
    }
    else {
        validationMessage.fieldName = 'sales';
        validationMessage.message = 'Field \'sales\' is mandatory';
        validationStatus.push(validationMessage);
    }

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