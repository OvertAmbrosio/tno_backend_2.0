import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import memoryCache from 'src/config/memoryCache';
import { variables } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(variables.secret),
    });
  }

  private async validate(payload: any) {
    const admin = await memoryCache.get(payload.username);

    if (!admin) throw new UnauthorizedException("Sesión inválida");

    return { 
      id: payload.sub, 
      username: payload.username
    };
  }
}