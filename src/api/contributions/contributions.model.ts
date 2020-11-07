import { Schema, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export const ContributionSchema = new Schema({
  usuario: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  grupo: {
    type: Types.ObjectId,
    ref: 'Group',
    default: null
  },
  capitulo: {
    type: Types.ObjectId,
    ref: 'Chapter',
    default: null
  },
  novela: {
    type: Types.ObjectId,
    ref: 'Novel',
    default: null
  },
  tipo: {//reporte, traduccion, edicion, 
    type: String,
    trim: true,
    required: true
  },
  estado: {//aprobado, rechazado, pendiente
    type: String,
    trim: true,
    default: 'pendiente' 
  },
  contenido: {
    type: String,
    trim: true,
    default: null,
  },
  titulo: {
    type: String,
    trim: true,
    default: null
  },
  numero: {
    type: Number,
    min: 0,
    default: null
  },
  portada: {
    type: String,
    trim: true,
    default: null
  },
  miniatura: {
    type: String,
    trim: true,
    default: null
  }
});

ContributionSchema.plugin(mongoosePaginate);