import { Schema } from "mongoose";

export const AuthAdminSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})