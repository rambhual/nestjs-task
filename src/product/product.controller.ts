import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  getAll(@Query('search') search: Product): Promise<Product[]> {
    return this.productService.getProducts(search);
  }

  @Get('/:id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProduct(id);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  addProduct(@Body() body, @GetUser() user): Promise<Product> {
    return this.productService.createProduct(body, user);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: Product,
  ): Promise<Product> {
    return this.productService.updateProduct(id, product);
  }
}
