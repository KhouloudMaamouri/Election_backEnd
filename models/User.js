const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
  cinId: {
    type: String,
    unique: true,
  },
  roles: {
    type: String,
    // default: ["user"],
  },
  isVoted: { type: Boolean, default: false },
  totalVote: {
    type: Number,
    default: 0,
  },
  picture: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
