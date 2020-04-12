const mongoCollections = require('../config/mongoCollections');
const issues = mongoCollections.issues;
const { ObjectId } = require('mongodb');

async function addIssue(category, date, latitude, longitude, city, state, userID) {
    if (!category) {
        throw 'Category missing.';
    }
    if (!date) {
        throw 'Date missing.';
    }
    if (!latitude) {
        throw 'Latitude missing.';
    }
    if (!longitude) {
        throw 'Longitude missing.';
    }
    if (!city) {
        throw 'City missing.';
    }
    if (!state) {
        throw 'State missing.';
    }
    if (!userID) {
        throw 'User ID missing.';
    }

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
    if (issueInfo.insertedCount === 0) {
        throw 'Could not add issue';
    }

    // const id = insertInfo.insertedId;
    //
    // const issue = await this.getAlbum(id);
    //
    // return issue;
    return 0;
}

module.exports = {  addIssue };
