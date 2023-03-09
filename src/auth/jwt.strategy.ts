import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET'),
    } as StrategyOptions);
  }

  async validate(payload) {
    console.log(payload, 'payload')
    return { phone: payload.phone };
  }
}