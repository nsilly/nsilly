import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserRepository from '../../Repositories/UserRepository';
import { UnauthorizedHttpException } from '@nsilly/exceptions';
import { Auth } from '@nsilly/auth';

export class JWT {
  sign() {
    return 'jwt';
  }

  get() {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    };
    if (opts.jwtFromRequest === undefined || opts.jwtFromRequest === null) {
      throw new UnauthorizedHttpException('Token not found');
    }
    return new JwtStrategy(opts, async (payload, done) => {
      const repository = new UserRepository();
      const user = await repository.where('id', payload.id).firstOrFail();
      await Auth.login(user);
      done(null, user);
    });
  }
}
