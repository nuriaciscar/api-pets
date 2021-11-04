const { Schema, model } = require("mongoose");

const ownerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Owner = model("Owner", ownerSchema);

module.exports = Owner;
