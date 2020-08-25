import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { IAuthAdmin } from './admins.interface';

@Injectable()
export class AdminsService {
  constructor(@InjectModel('Admin') private readonly adminsModel: Model<IAuthAdmin>) {}

  async getAdmin(username: string, password: string): Promise<IAuthAdmin> {
    return await this.adminsModel.findOne({username}).then( async(userObj) => {
      if(!userObj) return null;
      const isMatch = await bcrypt.compare(password, userObj.password);
      if(isMatch) {
        return userObj
      } else {
        return null
      };
    });
  }
}
