const express = require('express');
const session = require('express-session')
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const Handlebars = require('handlebars');
const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number') return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    },
    open: (value) => {
      return value === "open";
    }
  }
});
app.use(function (req, res, next) {
  if (!req.user)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

//Middleware to record to show the current path and request method.
var urlVisisted = [];
app.use(function (req, res, next) {
  if (req.originalUrl in urlVisisted) urlVisisted[req.originalUrl] += 1;
  else urlVisisted[req.originalUrl] = 1;
  console.log("URL path: " + req.originalUrl);
  console.log("HTTP verb: " + req.method);
  next();
});

//Middleware to record the count of URL hits.
app.use(function (req, res, next) {
  console.log(
    "URL " +
      req.originalUrl +
      " has been requested for " +
      urlVisisted[req.originalUrl] +
      " times."
  );
  console.log(urlVisisted);
  next();
});

app.use(cookieParser());
app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))
app.use(static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("Server is running!");
  console.log('Routes will be running on http://localhost:3000');
});
