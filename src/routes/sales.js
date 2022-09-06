'use strict'

const express = require('express');

const {upload, salesFile} = require('../controllers/upload');

const router = express.Router();

router.post('/upload', salesFile.single('salesData'), upload);

module.exports = router;