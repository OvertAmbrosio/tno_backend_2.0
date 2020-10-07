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
  async addNovelLibrary(@Args('novela') novela:string, @Args('idProvider') idProvider:string, @Args('guardar') guardar:boolean): Promise<UserType> {
    return await this.usersService.addLibrary(novela, idProvider, guardar);
  };
  //guardar ultimop capitulo leido
  @Mutation(() => UserType)
  async saveChapterOnLibrary(@Args('novela') novela:string, @Args('capitulo') capitulo:string, @Args('idProvider') idProvider:string): Promise<UserType> {
    return await this.usersService.saveChapterOnLibrary(novela, capitulo, idProvider);
  };
  //buscar la biblioteca del usuario
  @Query(() => UserType)
  async findLibrary(@Args('idProvider') idProvider:string, @Args('todo') todo:boolean): Promise<UserType> {
    return await this.usersService.findLibrary(idProvider, todo);
  };
  //buscar novela en biblioteca
  @Query(() => UserType)
  async findNovelInLibrary(@Args('novela') novela:string, @Args('idProvider') idProvider:string): Promise<UserType> {
    return await this.usersService.findNovelInLibrary(novela, idProvider);
  };
}