import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('/signUp')
  async signUp(
    @Body(ValidationPipe) authCredentials: AuthCredentialDto,
  ): Promise<void> {
    return await this.authService.createUser(authCredentials);
  }

  @Post('/signIn')
  async signIn(@Body() authCredentials: AuthCredentialDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentials);
  }

}
