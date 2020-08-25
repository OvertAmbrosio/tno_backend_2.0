import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'class-validator';

import memoryCache from 'src/config/memoryCache';
import { AdminsService } from './admins/admins.service';
import { IAdmin } from './admins/admins.interface';
import { TRespuesta, TErrorsLogin } from 'src/helpers/types';

const capitalize = (s: string):string => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService
  ) {}

  async validateAdmin(username: string, password: string): Promise<{admin: IAdmin, errors: TErrorsLogin}> {
    const sesion = await memoryCache.get(String(username));
    if (isEmpty(username)) { 
      return ({admin: null, errors: {username: 'Se necesita el Username.'}});
    } else if(isEmpty(password)) {
      return ({admin: null, errors: {password: 'Se necesita la contraseña.'}});
    } else if (sesion) {
      return ({admin:null, errors: {username: 'Ya hay una sesión activa.'}})
    } else {
      return await this.adminsService.getAdmin(username, password).then(async(admin) => {
        if (!admin) {
          return ({admin: null, errors: { username: 'Credenciales incorrectos.'}});
        } else {
          if(admin.status === 'activo') {
            return {admin, errors: null}
          } else {
            return {admin: null, errors: {username: 'El usuario se encuentra inactivo'}}
          }
        }
      }).catch((error) => {
        throw new InternalServerErrorException(error.message)
      })
    }
  };

  public async login(admin: IAdmin):Promise<TRespuesta> {
    const payload = { username: admin.username, sub: admin._id};
    const token = this.jwtService.sign(payload);

    await memoryCache.set(String(admin.username), token, {ttl: 86400});

    return ({
      status: 'success',
      message: 'Has iniciado sesión.',
      data: token
    })
  };

  public async session(token: string, username: string):Promise<TRespuesta> {
    const tokenUsuario: string =  await memoryCache.get(String(username));
    if (tokenUsuario === token) {
      return ({
        status: 'success',
        message: `Sesión verificada. Bienvenido ${capitalize(username)}.`
      });
    } else {
      return ({
        status: 'error',
        message: 'Error verificando la sesión.'
      });
    }
  };

  public async logout(token: string, username: string):Promise<TRespuesta> {
    const tokenUsuario: string = await memoryCache.get(String(username));
    if (tokenUsuario === token) {
      await memoryCache.del(String(username));
      return ({
        status: 'success',
        message: 'Sesión cerrada correctamente.'
      });
    } else {
      return ({
        status: 'error',
        message: 'Error verificando la sesión.'
      });
    }
  }
}
