import {
  BaseEntity,
  Unique,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import * as getHash from 'bcryptjs';
import { Product } from 'src/product/product.entity';
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  isActive: boolean = false;


  @OneToMany(type => Product, product => product.user, { eager: true })
  products: Product[]

  async validatePassword(password: string): Promise<boolean> {
    const hash = await getHash.hashSync(password, this.salt);
    return hash === this.password;
  }
}
