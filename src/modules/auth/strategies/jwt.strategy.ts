// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
//       ignoreExpiration: false,
//       secretOrKey: 'abcd123',
//     });
//   }

//   validate(payload: any) {
//     console.log('Inside JWT Strategy Validate');
//     console.log(payload);
//     return payload;
//   }
// }
