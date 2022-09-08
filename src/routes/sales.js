'use strict'

const express = require('express');

const {allSales, upload, salesFile} = require('../controllers/sales');

const router = express.Router();

router.get('/', allSales);

router.post('/upload', salesFile.single('salesData'), upload);

module.exports = router;