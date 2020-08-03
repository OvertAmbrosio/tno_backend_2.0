import { Schema, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2'

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
  },
  acron: {
    type: String,
    trim: true,
    uppercase: true,
    required: true,
    default: '-'
  },
  autor: {
    nombre: {// nombre del autor
      type: String,
      trim: true,
      default: null
    },
    usuario: {
      type: Types.ObjectId,
      ref: 'User',
      default: null,
    }
  },
  sinopsis: {
    type: String,
    trim: true,
    default: 'Sin sinopsis.'
  },
  //datos complementarios
  estado: {//emision, finalizado, cancelado
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    default: 'emision'
  },
  tipo: {
    type: Types.ObjectId,
    ref: 'Extra',
    required: true
  },
  categorias: [{
    type: Types.ObjectId,
    ref: 'Extra'
  }],
  etiquetas: [{
    type: Types.ObjectId,
    ref: 'Extra'
  }],
  imagen_portada: {
    url: {
      type: String,
      default: null
    },
    tipo: {
      type: String,
      default: null
    },
  },
  imagen_mini: {
    url: {
      type: String,
      default: null
    },
    tipo: {
      type: String,
      default: null
    },
  },
  capitulo_emision: {
    type: Types.ObjectId,
    ref: 'Chapter'
  },
  enviadoPor: {
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
  subidoPor: {
    type: Types.ObjectId,
    ref: 'Admin'
  },
  actualizadoPor: {
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

NovelSchema.plugin(mongoosePaginate);