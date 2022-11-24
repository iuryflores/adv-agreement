import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  ativo: {
    type: Boolean,
    default: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});
const User = model("User", userSchema);
export default User;
