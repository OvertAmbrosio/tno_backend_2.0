import { Document } from "mongoose";

export interface INovel extends Document{
  readonly nombre: string;
}
