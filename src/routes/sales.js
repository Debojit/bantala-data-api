'use strict'

const express = require('express');

const {getAll, upload, salesFile} = require('../controllers/sales');

const router = express.Router();

router.get('/', getAll);

router.post('/upload', salesFile.single('salesData'), upload);

module.exports = router;