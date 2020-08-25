import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RateLimiterModule, RateLimiterInterceptor } from 'nestjs-rate-limiter';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminsModule } from './admins/admins.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { variables } from 'src/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    RateLimiterModule,
    AdminsModule, 
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(variables.secret),
        signOptions: { expiresIn: '24h' }, // <== Reflexiona sobre la expiración
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, {provide: APP_INTERCEPTOR, useClass: RateLimiterInterceptor}],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
