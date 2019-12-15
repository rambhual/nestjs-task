import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsEmail()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}
