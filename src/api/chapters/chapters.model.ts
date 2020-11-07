import { Schema, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export const ChapterSchema = new Schema({
  titulo: {
    type: String,
    trim: true,
    required: true,
    default: '-'
  },
  numero: {
    type: Number,
    default: 0,
  },
  novela: {
    type: Types.ObjectId,
    ref: 'Novel',
    required: true,
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    default: 'capitulo-x'
  },
  cuerpo: {
    type: String,
    default: '-'
  },
  traductor_grupo: {
    type: Types.ObjectId,
    ref: 'Group',
    default: null,
  },
  traductor_usuario: {
    type: Types.ObjectId,
    ref: 'User',
    default: null
  },
  editor: {
    type: Types.ObjectId,
    ref: 'User',
    default: null
  },
  nota: {
    type: String,
    trim: true,
    default: null
  },
  //sistema
  subidoPor: {
    type: Types.ObjectId,
    ref: 'Admin',
    default: null
  },
  actualizadoPor: {
    type: Types.ObjectId,
    ref: 'Admin',
    default: null
  }
},{ 
  timestamps: true
});

ChapterSchema.plugin(mongoosePaginate);