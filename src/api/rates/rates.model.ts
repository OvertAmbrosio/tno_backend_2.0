import { Schema, Types } from 'mongoose';

export const RateSchema = new Schema({
  usuario: {
    type: String,
    required: true,
    index: true
  },
  novela:{
    type: Types.ObjectId,
    ref: 'Novel',
    index: true
  },
  valor: { //1 to 5
    type: Number,
    required: true
  }
}, {
  timestamps: true
});