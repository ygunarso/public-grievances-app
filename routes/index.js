const issuesRoutes = require("./issues");
const usersRoutes = require("./users");

const constructorMethod = app => {
  app.use("/issues", issuesRoutes);
  app.use("/users", usersRoutes);

  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;
