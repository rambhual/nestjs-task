import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(authCredentials: AuthCredentialDto): Promise<any> {
    return await this.userRepo.signUp(authCredentials);
  }

  async signIn(authCredentials: AuthCredentialDto) : Promise<{accessToken: string}> {
    const username = await this.userRepo.validateUserPassword(authCredentials);
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { username };
    const accessToken  = await this.jwtService.sign(payload);
    return {  accessToken };
  }
}
