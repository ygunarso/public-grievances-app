const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const issues = data.issues;
const users = data.users;

const main = async () => {
	const db = await dbConnection();
	await db.dropDatabase();
	// TODO seeds
	console.log('Done seeding database');
	await db.serverConfig.close();
};

main().catch(console.log);
