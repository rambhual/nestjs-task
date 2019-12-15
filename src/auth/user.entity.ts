import {
  BaseEntity,
  Unique,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';
import * as getHash from 'bcryptjs';
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

  async validatePassword(password: string): Promise<boolean> {
    const hash = await getHash.hashSync(password, this.salt);
    return hash === this.password;
  }
}
