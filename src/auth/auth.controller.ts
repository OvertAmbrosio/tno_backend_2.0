import { Controller, Post, UseGuards, Req, Get, Headers, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAdmin } from './admins/admins.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('private/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  private async login(@Req() req: Request) {
    const usuario: IAdmin|any = req.user;
    return this.authService.login(usuario);
  };

  @UseGuards(JwtAuthGuard)
  @Get('session')
  private async session(@Headers('authorization') token: string, @Res() res: Response, @Req() req: Request) {
    if (!token) {
      return res.send({status: 'error', message: 'No se encontró el token de acceso.'})
    } else {
      const usuario:any = req.user;
      const respuesta = await this.authService.session(String(token).substr(7, token.length), usuario.username);
      return res.send(respuesta);
    }
  };

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  private async logout(@Headers('authorization') token: string, @Res() res: Response, @Req() req: Request) {
    if (!token) {
      return res.send({status: 'error', message: 'No se encontró el token de acceso.'})
    } else {
      const usuario:any = req.user;
      const respuesta = await this.authService.logout(String(token).substr(7, token.length), usuario.username);
      return res.send(respuesta);
    }
  }
}
