import {
  BadGatewayException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
// import { ConfigService } from '@nestjs/config';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';
import { USER_REGISTERED } from './const';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    const { name, ...authDTO } = dto;

    const emailFromDB = await this.authService.validateUser(authDTO);
    const { email } = emailFromDB;
    return this.authService.login(email);
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const user = await this.authService.findUser(dto.email);
    // console.log(user);

    if (user) {
      throw new BadGatewayException(USER_REGISTERED);
    }
    return this.authService.register(dto);
  }
}
