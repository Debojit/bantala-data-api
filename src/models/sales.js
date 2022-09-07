'use strict'

const mongoose = require('mongoose');

const CellDataSchema = new mongoose.Schema({
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    comments: {
        type: [String],
        required: false
    }
});
const SaleSchema = new mongoose.Schema({
    bengaliDate: {
        type: CellDataSchema,
        required: true
    },
    englishDate: {
        type: CellDataSchema,
        required: true
    },
    sales: {
        type: CellDataSchema,
        required: true
    },
    guardDeposit: {
        type: CellDataSchema,
        required: true
    },
    otherCash: {
        type: CellDataSchema,
        required: true
    },
    netDailyIncome: {
        type: CellDataSchema,
        required: true
    },
    dailyExpense: {
        type: CellDataSchema,
        required: true
    },
    otherDeductions: {
        type: CellDataSchema,
        required: true
    },
    totalDeductions: {
        type: CellDataSchema,
        required: true
    },
    dailyBalance: {
        type: CellDataSchema,
        required: true
    },
    cumulativeTotal: {
        type: CellDataSchema,
        required: true
    }
});
const SaleModel = mongoose.model('Sale', SaleSchema);

module.exports = SaleModel;