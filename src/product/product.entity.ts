import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

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
}

export enum Status {
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED'
}
