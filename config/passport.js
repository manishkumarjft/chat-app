const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({id: id}, function(err, user) {
    done(err, user);
  });
});

var verifyHandler = function(req ,email, password, done) {
  process.nextTick(function() {
    User.findOne({ username: email }).exec(function(err, user) {
      if(err) return done(err);
      if(!user) return done(null, false, {message: 'Username or password incorrect'});

      bcrypt.compare(password, user.password, function(err, res) {
        if(!res) return done(null, false, { message: 'Username or password incorrect' });
        const userDetails = {
          id: user.id,
          username: user.username
        };
        return done(null, userDetails, { message: 'Login Succesful'});
      });
    });
  });
};

passport.use(new LocalStrategy({
  emailField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, verifyHandler));
