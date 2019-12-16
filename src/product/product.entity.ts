import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: Status;

  @ManyToOne(type => User, user => user.products, { eager: false })
  user: User;

}

export enum Status {
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
}
