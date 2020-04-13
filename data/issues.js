const mongoCollections = require('../config/mongoCollections');
const issues = mongoCollections.issues;
const users = require('./users');
const { ObjectId } = require('mongodb');

let exportedMethods = {
    async getAllIssuesByUserId(userID) {
        const issues = users.getUserById(userID).issues;
        const issueCollection = await issues();
        for (let issue of issues) {
            issue = this.getIssueById(issue);
        }
        if (!issueList) throw 'User has no issues!';
        return issueList
    },
    async getIssueById(id) {
        id = ObjectId(id)
        const issueCollection = await issues();
        const issue = await issueCollection.findOne({_id: id});
        return issue
    },
    async addIssue(category, date, latitude, longitude, city, state, userID) {
        if (!category) throw 'Category missing.';
        if (!date) throw 'Date missing.';
        if (!latitude) throw 'Latitude missing.';
        if (!longitude) throw 'Longitude missing.';
        if (!city) throw 'City missing.';
        if (!state) throw 'State missing.';
        if (!userID) throw 'User ID missing.';

        const issueCollection = await issues();

        let newIssue = {
            category: category,
            date: date,
            likes: 0,
            latitude: latitude,
            longitude: longitude,
            city: city,
            state: state,
            status: "open",
            userID: userID,
            comments: []
        };

        const issueInfo = await issueCollection.insertOne(newIssue);
        if (issueInfo.insertedCount === 0) throw 'Could not add issue';

        const id = insertInfo.insertedId;

        const issue = await this.getIssueById(id);

        return issue;
    }
};

module.exports = exportedMethods;
