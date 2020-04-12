const issuesRoutes = require("./issues");

const constructorMethod = app => {
  app.use("/", issuesRoutes);

  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;
