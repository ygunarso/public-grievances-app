const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const issues = mongoCollections.issues;
const { ObjectId } = require('mongodb');

// const { ObjectId } = require("mongodb").ObjectID;

// TODO
let exportedMethods = {
    async getAllUsers() {
      const userCollection = await users();
      const userList = await userCollection.find({}).toArray();
      if (!userList) throw 'No user in system!';
      return userList
    },
    async getUserById(id) {
      id = ObjectId(id)
      const userCollection = await users();
      const user = await userCollection.findOne({_id: id});
      return user
    },
    async addUser(firstName,lastName,email,city,state) {
      const userCollection = await users();
      let newUser = {
        firstName: firstName,
        lastName : lastName,
        email : email,
        city : city,
        // hashedPassword : hashedPassword,
        issues: [],
        state : state 
      };
  
      const newInsertInformation = await userCollection.insertOne(newUser);
      if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
      return await this.getUserById(newInsertInformation.insertedId);
    }
   };
module.exports = exportedMethods;
