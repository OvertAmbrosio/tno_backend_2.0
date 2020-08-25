import { Schema } from "mongoose";

export const AuthAdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {//activo / inactivo
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    default: 'activo'
  }
}, {
  timestamps: true
})