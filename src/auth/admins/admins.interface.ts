import { Document } from 'mongoose';

export interface IAuthAdmin extends Document {
  readonly username: string;
  readonly password: string;
}

export interface IAdmin {
  readonly username: string;
  readonly password: string;
}