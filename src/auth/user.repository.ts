import { Repository, EntityRepository } from 'typeorm';
import * as getSalt from 'bcryptjs';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredential: AuthCredentialDto): Promise<void> {
    const { username, password, email } = authCredential;
    const user = new User();
    user.username = username;
    user.email = email;
    user.salt = await getSalt.genSaltSync(Math.random());
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('user already exist!');
      } else {
        throw new InternalServerErrorException('');
      }
    }
  }

  async validateUserPassword(authCredentials: AuthCredentialDto) {
    const { username, password } = authCredentials;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await getSalt.hashSync(password, salt);
  }
}
