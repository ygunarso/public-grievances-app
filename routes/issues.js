const express = require('express');
const router = express.Router();
const data = require('../data');
const issuesData = data.issues;
const { ObjectId } = require('mongodb');

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

router.get('/:userid', async (req, res) => {
	try {
		let issueList = await issuesData.getIssuesByUserId(req.params.userid);
		if(issueList === null || issueList === undefined)
			res.status(404).json({ error: 'No issue found' })
		else
			res.render('grievances/issue',{issueList:issueList});
	} catch (e) {
		res.status(404).json({ error: 'issue not found' });
	}
});

router.get('/', async (req, res) => {
	try {
		let issueList = await issueData.getAllIssues();
		res.json(issueList);
	} catch (e) {
		res.sendStatus(400);
	}
});

router.post('/', async (req, res) => {
	let issueInfo = req.body;
	if (!issueInfo) {
		res.status(400).json({ error: 'You must provide data to create a user' });
		return;
    }
	if (!issueInfo.name) {
		res.status(400).json({ error: 'You must provide an issue name' });
		return;
	}
	if (!issueInfo.category) {
		res.status(400).json({ error: 'You must provide a category name' });
		return;
	}
	if (!issueInfo.date) {
		res.status(400).json({ error: 'You must provide date' });
		return;
	}
	if (!issueInfo.latitude) {
		res.status(400).json({ error: 'Latitude information is not present' });
		return;
	}
	if (!issueInfo.longitude) {
		res.status(400).json({ error: 'Longitude information is not present' });
		return;
    }
    if(!issueInfo.city){
        res.status(400).json({ error: 'You must provide city' });
		return;
    }
	if (!issueInfo.state) {
			res.status(400).json({ error: 'You must provide state' });
			return;
	}
	if (!issueInfo.userID) {
			res.status(400).json({ error: 'You must provide user ID' });
			return;
	}
	try {
		const newIssue = await issuesData.addIssue(issueInfo.name, issueInfo.category,
						issueInfo.date, issueInfo.latitude, issueInfo.longitude,
						issueInfo.city, issueInfo.state, issueInfo.userID);

        //req.session.issue = newUser.email

        req.session.AuthCookie = req.sessionID;
        let sessionInfo = req.session.issue;
		const issueList = [newIssue];
		res.render('grievances/issue',{issueList:issueList,sessionInfo:sessionInfo});
	} catch (e) {
		res.sendStatus(400);
	}
});

module.exports = router;
