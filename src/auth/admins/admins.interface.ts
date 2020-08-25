import { Document } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export interface IAuthAdmin extends Document {
  readonly username: string;
  readonly password: string;
  readonly status: string;
}

export interface IAdmin extends Document{
  readonly username: string;
  readonly password?: string;
}

export class AdminDTO {
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  readonly password: string;
}