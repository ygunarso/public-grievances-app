const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const { ObjectId } = require('mongodb');

router.get('/:id', async (req, res) => {
	try {
		let user = await usersData.getUserById(req.params.id);
		if(user === null || user === undefined)
			res.status(404).json({ error: 'user not found' })
		else
			res.json(user);
	} catch (e) {
		res.status(404).json({ error: 'user not found' });
	}
});
router.get('/', async (req, res) => {
	try {
		let userList = await usersData.getAllUsers();
		res.json(userList);
	} catch (e) {
		res.sendStatus(400);
	}
});
router.post('/', async (req, res) => {
	let userInfo = req.body;
	if (!userInfo) {
		res.status(400).json({ error: 'You must provide data to create a user' });
		return;
	}
	if (!userInfo.firstName) {
		res.status(400).json({ error: 'You must provide a first name' });
		return;
	}
	if (!userInfo.lastName) {
		res.status(400).json({ error: 'You must provide a last name' });
		return;
	}
	if (!userInfo.email) {
		res.status(400).json({ error: 'You must provide an email' });
		return;
	}
	if (!userInfo.city) {
		res.status(400).json({ error: 'You must provide city' });
		return;
	}
	if (!userInfo.state) {
			res.status(400).json({ error: 'You must provide state' });
			return;
	}
	try {
		const newUser = await usersData.addUser(userInfo.firstName,userInfo.lastName,userInfo.email,userInfo.city,userInfo.state);
		res.json(newUser);
	} catch (e) {
		res.sendStatus(400);
	}
});

module.exports = router;
