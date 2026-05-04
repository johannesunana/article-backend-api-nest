import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUsernameDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be minimum eight (8) characters' })
  password: string;
}
