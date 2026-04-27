import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginEmailDto {
  
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be minimum eight (8) characters' })
  password: string;
}
