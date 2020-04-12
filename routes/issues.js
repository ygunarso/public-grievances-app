const express = require('express');
const router = express.Router();
const data = require('../data');
const issuesData = data.issues;
const { ObjectId } = require('mongodb');


router.get('/', async (req, res) => {
    res.render('grievances/index');
});

module.exports = router;
