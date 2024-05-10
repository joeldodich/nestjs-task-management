import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { GetUsers200ResponseOneOfInner } from 'auth0';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
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

  async validate(payload: JwtPayload): Promise<GetUsers200ResponseOneOfInner> {
    const { sub } = payload;
    let user: GetUsers200ResponseOneOfInner;
    try {
      const res = await this.userService.getUserById(sub);
      user = res.data;
    } catch (error) {
      throw new Error('Incorrect token payload');
    }
    return user;
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
