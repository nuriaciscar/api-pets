const { Schema, model } = require("mongoose");

const petSchema = new Schema({
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

const Pet = model("Pet", petSchema);

module.exports = Pet;
