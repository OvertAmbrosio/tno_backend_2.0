import { Schema } from 'mongoose';

export const NovelSchema = new Schema(
  {
    nombre: { type: String, required: true },
  },
);