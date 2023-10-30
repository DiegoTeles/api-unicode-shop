import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from './users-roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { AllExceptionsFilter } from 'src/filters/http-exception.filter';

@Controller('users')
@UseFilters(AllExceptionsFilter)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<any> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }
}
