import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { NewUserInput, UserType } from './users.type';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  //ingresar usuario, si es nuevo crearlo, de lo contrario devolver sus datos
  @Mutation(() => UserType)
  async loginUser(@Args('userData') userData: NewUserInput): Promise<UserType> {
    return await this.usersService.loginUser(userData)
  };
  //agregar novela a la libreria
  @Mutation(() => UserType)
  async addNovelLibrary(@Args('novela') novela:string, @Args('_id') _id:string, @Args('guardar') guardar:boolean): Promise<UserType> {
    return await this.usersService.addLibrary(novela, _id, guardar);
  };
  //guardar ultimop capitulo leido
  @Mutation(() => UserType)
  async saveChapterOnLibrary(@Args('novela') novela:string, @Args('capitulo') capitulo:string, @Args('_id') _id:string): Promise<UserType> {
    return await this.usersService.saveChapterOnLibrary(novela, capitulo, _id);
  };
  //buscar la biblioteca del usuario
  @Query(() => UserType)
  async findLibrary(@Args('_id') _id:string, @Args('todo') todo:boolean): Promise<UserType> {
    return await this.usersService.findLibrary(_id, todo);
  };
  //buscar novela en biblioteca
  @Query(() => UserType)
  async findNovelInLibrary(@Args('novela') novela:string, @Args('_id') _id:string): Promise<UserType> {
    return await this.usersService.findNovelInLibrary(novela, _id);
  };
}