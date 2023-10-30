import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Req,
  UseFilters,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/users.entity';
import { AllExceptionsFilter } from 'src/filters/http-exception.filter';

@Controller('auth')
@UseFilters(AllExceptionsFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: any,
  ): Promise<{ message: string }> {
    await this.authService.signUp(createUserDto);

    return {
      message: 'Cadastro realizado com sucesso',
    };
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) credentiaslsDto: any,
  ): Promise<{ token: string }> {
    return await this.authService.signIn(credentiaslsDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getMe(@Req() req): User {
    return req.user;
  }

  @Put('/me')
  @UseGuards(AuthGuard())
  async updateUser(@Body() updateUserDto: any, @Req() request): Promise<any> {
    return this.authService.updateUser(request.user.id, updateUserDto);
  }
}
