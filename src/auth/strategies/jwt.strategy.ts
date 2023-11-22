import { UserService } from 'src/userModule/user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'testkey',
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const data = { user_id: payload.sub, email: payload.email };

    const user = await this.userService.findById(data.user_id);
    if (!user) {
      throw new UnauthorizedException('you do not have access to this page');
    }
    // const { password, ...userWihtNoPass } = user;

    return user;
  }
}
