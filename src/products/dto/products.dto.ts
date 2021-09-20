import { IsInt, IsNumber, IsString, Length } from 'class-validator';

export class productsDTO {
  @Length(1, 25)
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsString()
  madeIn: string;

  @IsNumber()
  @IsInt()
  price: number;
}
