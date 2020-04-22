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
    },
    async updateUser(userId, firstName, lastName, email, city,
      state) {
  
      const userCollection = await users();
      const updatedUserData = {};
  
      if (firstName) {
        updatedUserData.firstName = firstName;
      }
      if (lastName) {
        updatedUserData.lastName = lastName;
      }
      if (email) {
        updatedUserData.email = email;
      }
      if (city) {
        updatedUserData.city = city;
      }
      if (state) {
        updatedUserData.state = state;
      }
  
      const updatedInfo = await userCollection.updateOne({ _id: ObjectId(userId) }, { $set: updatedUserData });
      if (updatedInfo.modifiedCount === 0) {
        throw 'could not update the user successfully';
      }
  
      return await this.getUserById(userId);
  
    },

    async removeUser(id) { // same as pdf
      const userCollection = await users();
  
      let userdel = null;
      try {
        userdel = await this.getUserById(id);
      } catch (e) {
        console.log(e);
        return;
      }
      const deletionInfo = await userCollection.removeOne({ _id: ObjectId(id) });
      if (deletionInfo.deletedCount === 0) {
        throw "Could not delete the User";
      }
  
      return true;
  
    }
  
  


   };
module.exports = exportedMethods;
