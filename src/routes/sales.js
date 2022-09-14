'use strict'

const express = require('express');

const salesUploadMw = require('../middleware/upload');
const salesController = require('../controllers/sales');

const router = express.Router();

router.use(express.json()); // For parsing application/json
router.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

router.get('/', salesController.allSales);

router.get('/:id', salesController.getSale);

router.post('/', salesController.createSalesItems);

router.post('/upload', salesUploadMw.salesFile.single('salesData'), salesController.upload);

module.exports = router;