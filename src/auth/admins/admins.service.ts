import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { IAdmin, IAuthAdmin } from './admins.interface';

@Injectable()
export class AdminsService {

  private admins: IAdmin[] = [];

  constructor(@InjectModel('admins') private readonly adminsModel: Model<IAuthAdmin>) {}

  async adminsTrash(): Promise<void> {
    this.admins = [];
  }
  
  private async pushAdminsFromDB(): Promise<void> {
    const authAdmins = await this.adminsModel.find();
    for (const admin of authAdmins) {
      const { username, password } = admin;
      const adminObj: IAdmin = { username, password };
      this.admins.push(adminObj);
    }
  }

  async findOne(username: string, password: string): Promise<IAdmin> {
    let adminObj: IAdmin;

    this.pushAdminsFromDB();

    for (const hash of this.admins) {
      const adminExists = await bcrypt.compare(username, hash.username)
        .then((res: boolean|undefined) => res);
      const passwordExists = await bcrypt.compare(password, hash.password)
        .then((res: boolean|undefined) => res);
      
      if (adminExists && passwordExists) {
        adminObj = { username: hash.username, password: hash.password };
        console.log(this.admins);
        return adminObj;
      }
    }
  }
}
