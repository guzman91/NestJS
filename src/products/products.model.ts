import { Prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ProductsModel extends Base {}
export class ProductsModel extends TimeStamps {
  @Prop()
  name: string;

  @Prop()
  year: number;

  @Prop()
  madeIn: string;

  @Prop()
  price: number;
}
