const { Schema, model } = require("mongoose");


const contactSchema = new Schema({
   username: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
}, {
  timestamps: true  // ✅ This line auto-generates createdAt & updatedAt
});

// create a model or a collection
const Contact = new model("contact", contactSchema);

module.exports = Contact;