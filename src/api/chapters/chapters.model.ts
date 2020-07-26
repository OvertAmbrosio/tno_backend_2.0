import { Schema, Types } from 'mongoose';

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
    ref: 'Novel'
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    default: 'capitulo-x'
  },
  contenido: {
    cuerpo: {
      type: String,
      default: '-'
    },
    traductor: {
      type: Types.ObjectId,
      ref: 'Group',
    },
    editor: {
      type: Types.ObjectId,
      ref: 'Group'
    },
    nota: {
      type: String,
      trim: true,
      default: null
    }
  }
},{ 
  timestamps: true
})