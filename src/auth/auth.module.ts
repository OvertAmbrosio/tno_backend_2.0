import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminsModule } from './admins/admins.module';
import { LocalStrategy } from './strategies/local.strategy';
import { variables } from 'src/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    AdminsModule, 
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(variables.secret),
        signOptions: { expiresIn: '2h' }, // <== Reflexiona sobre la expiración
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
