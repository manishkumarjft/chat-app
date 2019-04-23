/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

bcrypt = require('bcrypt-nodejs');

module.exports = {

  attributes: {
    username:{
      type:'string'
    },
    password:{
      type:"string"
    },
    message:{
      collection: 'message',
      via: 'user'
    },
    group:{
      collection:'group',
      via:'user'
    }
  },
  beforeCreate: function(user, cb){
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  }
};

