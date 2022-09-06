'use strict'

const express = require('express');

const {upload} = require('../controllers/import');

const router = express.Router();

router.post('/upload', upload);

module.exports = router;