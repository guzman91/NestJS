import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { genSalt, hashSync } from 'bcryptjs';
import { InjectModel, TypegooseModule } from 'nestjs-typegoose';
import { AuthModel } from './auth.model';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel) private readonly authModel: ModelType<AuthModel>,
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
}
