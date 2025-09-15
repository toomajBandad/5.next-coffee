import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String },
  company: { type: String },
  body: { type: String, required: true },
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
