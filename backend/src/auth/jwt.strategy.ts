import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'your-secret-key',
    });
    console.log('JwtStrategy initialized with secret:', configService.get('JWT_SECRET') ? '[SECRET]' : 'default');
  }

  async validate(payload: any) {
    console.log('JwtStrategy - Validating token payload:', payload);
    return { userId: payload.sub, email: payload.email };
  }
}
