/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getGroups: async function (req, res) {
    let groups = await Group.find({});
    return res.json({groups: groups});
  },

  create: async function (req, res) {
    let newGroup = await Group.create({name:'group 1'});
    if(newGroup){
      return res.json({message:'Group created'});
    }
  }

};

