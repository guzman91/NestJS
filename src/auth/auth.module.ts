import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthController } from './auth.controller';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypegooseModule.forFeature([AuthModel]),
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
