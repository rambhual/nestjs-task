import { Injectable } from '@nestjs/common';
import { Product, Tags } from './product.model';
import * as uuid from 'uuid/v1';
@Injectable()
export class ProductService {
  private products: Product[] = [];
  getProducts(): Product[] {
    return this.products;
  }

  createProduct(product: Product): Product {
    const newProduct: Product = {
      id: uuid(),
      name: product.name,
      description: product.description,
      price: product.price,
      tags: Tags.FEATURED,
    };
    this.products.push(newProduct);
    return newProduct;
  }
}
