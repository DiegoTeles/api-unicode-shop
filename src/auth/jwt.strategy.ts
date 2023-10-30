import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { User } from 'src/users/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsersRepository)
    private readonly userRepository: typeof User, //private userRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'super-secret',
    });
  }

  async validate(payload: { id: number }) {
    const { id } = payload;
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return user;
  }
}
