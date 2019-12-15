import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, Status } from './product.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository) private repository: ProductRepository,
  ) {}

  async getProducts(search: Product): Promise<Product[]> {
    return await this.repository.getProducts(search);
  }
  async getProduct(id: number): Promise<Product> {
    const product = await this.repository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Not found product with ${id}`);
    }
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Not found product with ${id}`);
    }
  }

  async createProduct(product: Product): Promise<Product> {
    const { name, description, status } = product;
    const addProduct = new Product();
    addProduct.name = name;
    addProduct.description = description;
    addProduct.status = Status.OPEN;
    await addProduct.save();
    return addProduct;
  }

  async updateProduct(id: number, product: Product): Promise<Product> {
    const updateProduct = await this.getProduct(id);
    updateProduct.name = product.name;
    updateProduct.description = product.description;
    updateProduct.status = product.status;
    await updateProduct.save();
    return updateProduct;
  }
}
