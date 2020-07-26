import { Schema, Types } from 'mongoose';

export const ChapterSchema = new Schema({
  titulo: {
    type: String,
    trim: true,
    default: '-'
  },
  tipo: {//portada, miniatura, wallpaper
    type: String,
    trim: true,
    default: 'wallpaper'
  },
  contentType: {//jpg-png
    type: String,
    trim: true,
    default: null
  },
  url: {
    type: String,
    trim: true,
    required: true,
    default: null
  },
  key: {
    type: String,
    trim: true,
    required: true,
    default: null
  },
  novela: {
    type: Types.ObjectId,
    ref: 'Novel'
  }
})