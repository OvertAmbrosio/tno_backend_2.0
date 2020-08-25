import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IAdmin } from '../admins/admins.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<IAdmin> {
    const {admin, errors} = await this.authService.validateAdmin(username, password);
    if (!admin) {
      throw new UnauthorizedException(errors);
    }
    return admin;
  }
}