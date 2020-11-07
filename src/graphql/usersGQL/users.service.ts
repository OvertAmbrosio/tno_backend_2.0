import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser } from 'src/api/users/users.interface';
import { NewUserInput } from './users.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>
  ) {}
  // logear usuario, si es nuevo guardarlo, si existe devolverlo
  public async loginUser(user: NewUserInput): Promise<IUser> {
    return await this.userModel.findById({ _id: user._id }).then(async(data) => {
      if (data) {
        return data;
      } else {
        const newUser = new this.userModel(user);
        newUser.username = user.name;
        return await newUser.save()
      }
    })
  };
  //guardar novela o eliminarla de la libreria
  public async addLibrary(novela: string, _id: string, guardar: boolean): Promise<IUser> {
    if (guardar) {
      return await this.userModel.findOneAndUpdate({$and:[
        {_id}, { "biblioteca.novela": { $ne: novela } }
      ]}, {
        $push: {
          biblioteca: { novela, capitulo: null }
        }
      })
    } else {
      return await this.userModel.findOneAndUpdate({$and:[
        {_id}, { "biblioteca.novela": novela }
      ]}, {
        $pull: {
          biblioteca: { novela }
        }
      });
    };
  };
  //guardar capitulo en biblioteca segun la novela
  public async saveChapterOnLibrary(novela: string, capitulo: string, _id: string): Promise<IUser> {
    return await this.userModel.findOneAndUpdate({ _id, 'biblioteca.novela': novela }, {
      $set: {
        "biblioteca.$.capitulo": capitulo
      }
    })
  };
  //traer toda la biblioteca del usuario
  public async findLibrary(_id: string, todo: boolean): Promise<IUser> {
    return await this.userModel.findOne({_id})
      .populate({
        path: 'biblioteca.novela',
        populate: {
          path: 'capitulo_emision',
          select: 'numero slug'
        }
      }).populate('biblioteca.capitulo', 'slug numero').then((data) => {
        if (data && data.biblioteca.length>7 && !todo) {
          data.biblioteca.splice(7);
          return data;
        } else {
          return data;
        }
      })
  }
  //buscar novela en la biblioteca del usuario
  public async findNovelInLibrary(novela: string, _id: string): Promise<IUser> {
    return await this.userModel.findOne({_id, biblioteca: { $elemMatch: { novela } }})
      .populate('biblioteca.novela', 'slug').populate('biblioteca.capitulo', 'titulo numero slug')
      .select('biblioteca idProvider')
  };
  
}