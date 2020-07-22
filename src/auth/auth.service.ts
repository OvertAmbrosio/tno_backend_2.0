import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from './admins/admins.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService
  ) {}

  async validateAdmin(username: string, pass: string): Promise<any> {
    const admin = await this.adminsService.findOne(username, pass);
    if (admin && admin.password === pass) {
      const { password, ...result} = admin;
      this.adminsService.adminsTrash();
      return result;
    }
    return null;
  }

  async login(admin: any) {
    const payload = { username: admin.username, sub: admin.userId};
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
