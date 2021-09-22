import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { genSalt, hashSync, compare } from 'bcryptjs';
import { InjectModel, TypegooseModule } from 'nestjs-typegoose';
import { AuthModel } from './auth.model';
import { PASSWORD_NOT_MATCH, USER_NOT_FOUND } from './const';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel) private readonly authModel: ModelType<AuthModel>,
    private readonly jwtService: JwtService,
  ) {}
  async register(dto: AuthDto): Promise<DocumentType<AuthModel>> {
    const salt = await genSalt(10);
    const { password, ...newDTO } = dto;

    const newUser = new this.authModel({
      ...newDTO,
      hashPassword: hashSync(dto.password, salt),
    });

    return newUser.save();
  }

  async findUser(email: string): Promise<DocumentType<AuthModel> | null> {
    return this.authModel.findOne({ email }).exec();
  }

  async validateUser({
    email,
    password,
  }: AuthDto): Promise<Pick<AuthModel, 'email'>> {
    const userFromDB = await this.authModel.findOne({ email });

    if (!userFromDB) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }

    const passwordIsValid = await compare(password, userFromDB.hashPassword);

    if (!passwordIsValid) {
      throw new UnauthorizedException(PASSWORD_NOT_MATCH);
    }

    return { email: userFromDB.email };
  }

  async login(email: string) {
    return {
      access_token: await this.jwtService.signAsync({ email }),
    };
  }
}
