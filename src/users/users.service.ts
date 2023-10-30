import {
  Injectable,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CredentialsDto } from 'src/auth/dto/credentials.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository)
    private readonly userRepository: typeof User, //private userRepository: UsersRepository,
  ) {}

  async createAdminUser(createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      try {
        const salt = await bcrypt.genSalt();

        const user = new User();
        user.status = 'true';
        user.name = createUserDto.name;
        user.email = createUserDto.email.trim().toLowerCase();
        user.role = 'USER';
        user.confirmationToken = crypto.randomBytes(32).toString('hex');
        user.salt = salt;
        user.password = await this.hashPassword(createUserDto.password, salt);
        await user.save();
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;
    const user = await this.userRepository.findOne<User>({ where: { email } });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
