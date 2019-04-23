
module.exports = {

  onlineUsers:function (req, res) {
    res.view('user/onlineUsers', {layout: 'layout'});
  },

  getUsers: async function (req, res) {
    let users = await User.find({});
    return res.json({users: users});
  },

  addToGroup: async function(req, res){
    let group = await Group.findOne({name:'group 1'});
    let user = await User.findOne({username: 'manish'});
    if(user){
      user.group.add(group.id);
      user.save();
      return res.json({message: 'Group added'})
    }
  },

  register: async function (req, res) {
    if(req.method === 'GET'){
      console.log("method")
      return res.view('user/register');
    }else{
      let userData = req.allParams();
      let newUser = await User.create({username: userData.username});
      // User.publishCreate(newUser, req);
      // sails.io.emit(newUser.id,{user:newUser});
      // User.subscribe('user', _.pluck(newUser, 'id'));
      // sails.sockets.blast('user', {
      //   user: newUser
      // });
      if(newUser){
        return res.ok();
      }
    }
  },

};

