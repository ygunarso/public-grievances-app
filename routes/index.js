const issuesRoutes = require("./issues");
const usersRoutes = require("./users");
const express = require('express');
const session = require('express-session');
const router = express.Router();
const bcrypt = require('bcryptjs');

const constructorMethod = (app) => {
  app.use("/issues", issuesRoutes);
  app.use("/users", usersRoutes);
  app.use("/signup", (req, res) => {
    res.render('grievances/signup');
  });
  // app.post('/test', async (req, res) => {
  //   try{
  //       let data = req.body;
  //       console.log(data)
  //       res.render('grievances/test');
  //   }
  //   catch (e) {
  //   res.sendStatus(400);
  // }
  // });
  app.use("/", (req, res) => {
    res.render('grievances/index');
  });
  
};


module.exports = constructorMethod
