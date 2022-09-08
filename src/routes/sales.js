'use strict'

const express = require('express');

const salesController = require('../controllers/sales');

const router = express.Router();

router.get('/', salesController.allSales);

router.get('/:id', salesController.getSale);

router.post('/upload', salesController.salesFile.single('salesData'), salesController.upload);

module.exports = router;