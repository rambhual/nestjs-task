import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository
  ) {}

  async createUser(authCredentials: AuthCredentialDto): Promise<any> {
    return await this.userRepo.signUp(authCredentials);
  }

  async signIn(authCredentials: AuthCredentialDto) {
    const user = await this.userRepo.validateUserPassword(authCredentials);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
