import { Schema, Types } from 'mongoose';

export const UserSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  //objeto que trae el provider
  name: String,
  email: String,
  image: String,
  //datos del sistema
  username: {
    type: String,
    default: null,
    trim: true
  },
  estado: {//controlar baneos del sistema, 1_activo, 2_ban temporal, 3_permaban
    type: Number,
    default: 1,
  },
  tipo: {//manejar tipos de usuario segun los aportes, aun en desarrollo
    type: String,
    default: 'lector'
  },
  biblioteca: [{
    novela: {
      type: Types.ObjectId,
      ref: 'Novel',
      default: null
    },
    capitulo: {
      type: Types.ObjectId,
      ref: 'Chapter',
      default: null
    }
  }]
})