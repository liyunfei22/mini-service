import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStorage } from './jwt.strategy';

console.log('user module', UserModule);
@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('SECRET', 'test123456'),
          signOptions: { expiresIn: '4h' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStorage],
  exports: [AuthService]
})
export class AuthModule {}
