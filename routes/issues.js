const express = require('express');
const router = express.Router();
const data = require('../data');
const issuesData = data.issues;
const { ObjectId } = require('mongodb');


router.get('/', async (req, res) => {

});

router.get('/:id', async (req, res) => {
	try {
		let issue = await issuesData.getIssueById(req.params.id);
		if(issue === null || issue === undefined)
			res.status(404).json({ error: 'issue not found' })
		else
			res.json(issue);
	} catch (e) {
		res.status(404).json({ error: 'issue not found' });
	}
});

module.exports = router;
