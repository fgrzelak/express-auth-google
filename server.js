var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config');

var app = express();
var googleProfile = null;

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb) {
        googleProfile = profile;
        cb(null, profile);
    }
));

app.set('view engine', 'pug');
app.set('views', './views');
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => { 
    res.render('index', { user: googleProfile }); 
});

app.get('/logout', (req, res) => {
    googleProfile = null;
    res.redirect('/');
});

app.get('/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/'
    })
);

app.listen(3000);

app.use((req, res, next) => {
    res.status(404).send('Error 404: Not found');
});
