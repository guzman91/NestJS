import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthModel } from './auth.model';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly ConfigModule: ConfigService) {}

  @HttpCode(200)
  @Post('login')
  login(@Body() dto: AuthModel) {
    return {
      login: true,
      ...dto,
    };
  }

  @Post('register')
  register(@Body() dto: AuthDto) {
    return dto;
  }
}
