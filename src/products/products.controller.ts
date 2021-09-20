import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { productsDTO } from './dto/products.dto';
import { ProductsModel } from './products.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.findAll();
    // return 'Hello from products !!!';
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    // return 'Get One ' + id;
    try {
      const productDoc = await this.productsService.findById(id);

      if (!productDoc) {
        throw new HttpException('Record Not Found', HttpStatus.NOT_FOUND);
      } else {
        return productDoc;
      }
    } catch (error) {
      throw new HttpException('Record Not Found', HttpStatus.NOT_FOUND);
    }
  }
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: productsDTO) {
    return this.productsService.create(dto);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<ProductsModel | HttpException> {
    const deletedDoc = this.productsService.deleteById(id);

    if (!deletedDoc) {
      throw new HttpException('Record Not Found', HttpStatus.NOT_FOUND);
    } else {
      return deletedDoc;
    }
  }
}
