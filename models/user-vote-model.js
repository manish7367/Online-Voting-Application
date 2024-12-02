const mongoose = require('mongoose');

const userVoteSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true
  },
  party: {
    type: String,
    required: true
  }
});

const UserVote = new mongoose.model('UserVote',userVoteSchema);

module.exports = UserVote;