import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // constructor() {
  constructor(private userService: UsersService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_ISSUER_DOMAIN}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_ISSUER_DOMAIN}/`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<User['_id']> {
    const { sub } = payload;
    let userId: User['_id'];
    const user = await this.userService.syncWithAuth0(sub);
    userId = user._id;
    return userId;
  }

  // validate(payload: JwtPayload) {
  //   const { sub } = payload;
  //   return sub;
  // }
}

interface JwtPayload {
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  gty: string;
  azp: string;
}
