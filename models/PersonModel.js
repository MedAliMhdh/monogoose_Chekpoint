const mongoose = require("mongoose");

const PersonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  dateOfBirth: {
    type: Date,
    default: Date.now,
  },

  favouritFood: [String],
});

module.exports = mongoose.model("Person", PersonSchema);
