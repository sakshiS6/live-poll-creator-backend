const { Schema, model } = require("../connection");

const mySchema = new Schema({
  title: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("rooms", mySchema);