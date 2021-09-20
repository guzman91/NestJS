import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { productsDTO } from './dto/products.dto';
import { ProductsModel } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductsModel)
    private readonly productsModel: ModelType<ProductsModel>,
  ) {}

  async create(dto: productsDTO): Promise<DocumentType<ProductsModel>> {
    return this.productsModel.create(dto);
  }

  async findAll(): Promise<DocumentType<ProductsModel>[] | null> {
    return this.productsModel.find();
  }

  async findById(id: string): Promise<DocumentType<ProductsModel> | null> {
    return this.productsModel.findById(id);
  }

  async deleteById(id: string): Promise<DocumentType<ProductsModel> | null> {
    return this.productsModel.findByIdAndDelete(id);
  }
}
