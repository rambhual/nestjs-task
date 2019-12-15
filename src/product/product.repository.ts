import { Repository, EntityRepository } from 'typeorm';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getProducts(searchProduct: Product): Promise<Product[]> {
    const query = await this.createQueryBuilder('product');
    if (searchProduct) {
      query.andWhere(
        'product.name LIKE :searchProduct OR product.description LIKE :searchProduct',
        {
          searchProduct: `%${searchProduct}%`
        }
      );
    }
    const products = await query.getMany();
    return products;
  }
}
