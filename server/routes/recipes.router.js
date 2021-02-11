const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
// middleware for checking login
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


module.exports = router;