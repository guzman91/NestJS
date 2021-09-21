import { Prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { IsString } from 'class-validator';

export interface AuthModel extends Base {}
export class AuthModel extends TimeStamps {
  @IsString()
  @Prop()
  name?: string;

  @IsString()
  @Prop({ unique: true })
  email: string;

  @Prop()
  @IsString()
  hashPassword: string;
}
