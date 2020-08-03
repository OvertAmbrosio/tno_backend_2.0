import { Schema, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export const ImageSchema = new Schema({
  titulo: {
    type: String,
    trim: true,
    unique: true,
    require: true
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
    unique: true
  },
  novela: {
    type: Types.ObjectId,
    ref: 'Novel'
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

ImageSchema.plugin(mongoosePaginate);
