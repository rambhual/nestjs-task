import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): Product[] {
    return this.productService.getProducts();
  }

  @Post()
  addProduct(@Body() body): Product {
    const product = { ...body };
    return this.productService.createProduct(product);
  }
}
