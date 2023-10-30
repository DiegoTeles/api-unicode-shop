import {
  Injectable,
  Inject,
  UnprocessableEntityException,
  UnauthorizedException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/users.entity';
import { UserRole } from '../users/users-roles.enum';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersRepository)
    private readonly userRepository: typeof User,
    //private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const user = new User();

        user.status = 'true';
        user.name = createUserDto.name;
        user.email = createUserDto.email.trim().toLowerCase();
        user.role = UserRole.USER;
        user.confirmationToken = crypto.randomBytes(32).toString('hex');
        user.salt = salt;
        user.password = await this.hashPassword(createUserDto.password, salt);
        return await user.save();
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
  }

  async signIn(credentialsDto: any) {
    const user = await this.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return { token, user };
  }

  async updateUser(id: string, updateUserDto: any) {
    //const user = await this.userRepository.findByPk<User>(id);
    const user = await this.userRepository.findOne<User>({ where: { id } });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    user.email = updateUserDto.email || user.email;
    user.name = updateUserDto.name || user.name;
    user.password = updateUserDto.password || user.password;

    try {
      //const data = await user.save();
      return await user.save();
      //return new UserDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
