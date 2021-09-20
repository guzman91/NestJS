import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductsController } from './products.controller';
import { ProductsModel } from './products.model';
import { ProductsService } from './products.service';

@Module({
  imports: [TypegooseModule.forFeature([ProductsModel])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
