import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authServivce: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const admin = await this.authServivce.validateAdmin(username, password);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}