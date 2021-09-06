import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getAll(): string {
    return 'Hello from products !!!';
  }

  @Get(':id')
  getOne(@Param('id') id: string): string {
    return 'Get One ' + id;
  }
}
