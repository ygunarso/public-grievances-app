const mongoCollections = require('../config/mongoCollections');
const issues = require('./issues');
const collection = mongoCollections.issues;
const { ObjectId } = require('mongodb');

let exportedMethods = {
    async getAllComments(issueId) {
        const issue = issues.getIssueById(issueId);
        return issue.comments;
    },
    async addComment(name, body, issueId) {
        const issue = issues.getIssueById(issueId);
        const comment = {
            _id: issue.userID,
            name: name,
            content: content
        };

        const issueCollection = await collection();

        const updatedInfo = await albumCollection.updateOne({ _id: issueId }, {$addToSet: {comments: comment}});
        if (updatedInfo.modifiedCount === 0) {
            throw 'Could not add comment.';
        }
        
        return comment;
    }
};

module.exports = exportedMethods;
