const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const { ObjectId } = require('mongodb');


router.get('/', async (req, res) => {
    res.render('grievances/index');
});

module.exports = router;
