/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getMessages: async function (req, res) {
    let messages = await Message.find({});
    res.json({messages: messages});
  },

  create: async function (req, res) {
    let newMessage = await Message.create({message: 'message 1'})
    if(newMessage){
      return res.json({message:'Message created'})
    }
  }

};

