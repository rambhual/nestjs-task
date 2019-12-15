import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredential: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredential;
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
  }
}
