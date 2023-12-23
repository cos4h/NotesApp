const mongoose = require("mongoose");

//const url = "mongodb://cos4h:M@rzo2004@localhost:27017/notes-app?authMechanism=DEFAULT";

const dbUrl = process.env.MONGODB_URI;

console.log("connecting to ", dbUrl);

mongoose
  .connect(dbUrl)
  .then((result) => {
    console.log("Connected to mongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MONGODB", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  important: {
    type: Boolean,
    required: false
  }
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
