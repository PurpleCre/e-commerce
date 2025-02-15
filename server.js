// express server
const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const app = express();


const port = 3000;

app.use(bodyParser.json());

// This is use for calling the passport session 
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}))
  .use(passport.initialize())
  .use(passport.session())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})
  .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
  .use(cors({ origin: "*" }))
  .use('/', require('./routes'));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
  function (accessToken, refreshToken, profile, done) {
    //   //User.findOrCreate({githubId: profile.id}, function (err, user) {
    //   return done(null, profile);
    //   // });
    // }
    if (profile) {
      console.log('User  profile:', profile);
      return done(null, profile);
    } else {
      console.error('Failed to fetch user profile');
      return done(new Error('Failed to fetch user profile'));
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")
});

app.get("/github/callback", passport.authenticate("github", {
  failureRedirect: "/api-docs", session: false
}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  });

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    // Only start the server if not in test environment
    if (process.env.NODE_ENV !== 'test') {
      app.listen(process.env.PORT || port, () => {
        console.log('Web Server is listening at port ' + (process.env.PORT || port));
      });
    }
  }
});

// Export the app for testing
module.exports = app;
