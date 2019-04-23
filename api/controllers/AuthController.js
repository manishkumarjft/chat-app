/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const passport = require('passport');

module.exports = {

  logout: function(req, res) {
    sails.io.emit('offline',{user: req.session.user});
    req.logout();
    req.session.user = [];
    req.session.isLoggedIn = false;
    res.redirect('/');
  },

  login: async function (req, res) {
    if(req.method === 'GET'){
      return res.view('user/login');
    }else{
      let that = this;
      passport.authenticate('local', function (err, user, info) {
        if ((err) || (!user)) {
          req.flash('errMsg', info.message);
          return res.redirect('/');
        }
        req.logIn(user, async function (err) {
          if (err) res.json({success: false, message: 'Something went wrong'});
          req.session.user = user;
          req.session.isLoggedIn = true;
          sails.io.emit('online',{user: user});
          return res.redirect('/onlineUsers');
        });
      })(req, res);
    }
  },

  register: async function (req, res) {
    let foundUser = await User.find({});
    // sails.io.emit('online',{user: foundUser[0]});            working
    // sails.sockets.blast('user', {
    //   user: foundUser
    // });                                                      working
    if(req.method === 'GET'){
      return res.view('user/register');
    }else{
      let userData = req.allParams();
      let newUser = await User.create({username: userData.username, password: userData.password});
      if(newUser){
        res.redirect('/login');
      }
    }
  },
};
