import { Schema } from 'mongoose';

export const ExtraSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    default: null
  },
  tipo: {//1-tipo, 2-categoria, 3-etiqueta
    type: Number,
    min: 1,
    max: 3,
    default: 1
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
    default: null
  },
  descripcion: {
    type: String,
    trim: true,
    default: null
  }
},{
  timestamps: true
});
