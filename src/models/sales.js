'use strict'

const mongoose = require('mongoose');

const connection = require('./connection');

const DataItemSchema = new mongoose.Schema({
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    comments: {
        type: [String],
        required: false,
        default: undefined
    }
}, { _id : false }); //Skip id for field-level properties
const SaleSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    bengaliDate: {
        type: String,
        required: true
    },
    englishDate: {
        type: Date,
        required: true
    },
    sales: {
        type: DataItemSchema,
        required: true
    },
    guardDeposit: {
        type: DataItemSchema,
        required: true
    },
    otherCash: {
        type: DataItemSchema,
        required: true
    },
    netDailyIncome: {
        type: DataItemSchema,
        required: true
    },
    dailyExpense: {
        type: DataItemSchema,
        required: true
    },
    otherDeductions: {
        type: DataItemSchema,
        required: true
    },
    totalDeductions: {
        type: DataItemSchema,
        required: true
    },
    dailyBalance: {
        type: DataItemSchema,
        required: true
    },
    cumulativeTotal: {
        type: DataItemSchema,
        required: true
    }
});
const SaleModel = connection.model('Sale', SaleSchema);

module.exports = SaleModel;