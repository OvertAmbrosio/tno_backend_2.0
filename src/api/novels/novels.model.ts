import { Schema, Types } from 'mongoose';

export const NovelSchema = new Schema({
  //datos descripcion de la novela
  activo: {//saber si la novela ha sido eliminada
    type: Boolean,
    default: true
  },
  titulo: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    default: '-'
  },
  titulo_alt: {
    type: String,
    trim: true,
    default: '-'
  },
  slug: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
    default: '-'
  },
  acron: {
    type: String,
    trim: true,
    uppercase: true,
    default: '-'
  },
  autor: {
    nombre: {// nombre del autor
      type: String,
      trim: true,
      default: '-'
    },
    usuario: {
      type: Types.ObjectId,
      ref: 'User'
    }
  },
  sinopsis: {
    type: String,
    trim: true,
    default: 'Sin sinopsis.'
  },
  //datos complementarios
  estado: {//emision, finalizado, cancelado, pendiente (de aprobacion)
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    default: 'pendiente'
  },
  tipo: {
    type: Types.ObjectId,
    ref: 'Type'
  },
  categorias: [{
    type: Types.ObjectId,
    ref: 'Category'
  }],
  etiquetas: [{
    type: Types.ObjectId,
    ref: 'Tag'
  }],
  imagen_portada: {
    type: Types.ObjectId,
    ref: 'Image'
  },
  imagen_mini: {
    type: Types.ObjectId,
    ref: 'Image'
  },
  imagen_wallpaper: [{
    type: Types.ObjectId,
    ref: 'Image'
  }],
  capitulo_emision: {
    type: Types.ObjectId,
    ref: 'Chapter'
  },
  subidoPor: {
    type: Types.ObjectId,
    ref: 'Group'
  },
  //rating momentaneo
  rating: {
    contador: {
      type: Number,
      default: 0
    },
    valor: {
      type: Number,
      default: 0
    }
  },
  //variables de sistema
  aprobadoPor: {
    type: Types.ObjectId,
    ref: 'Admin'
  },
  observacion: {
    type: String,
    trim: true,
    lowercase: true,
    default: '-'
  }
},
{
  timestamps: true,
});