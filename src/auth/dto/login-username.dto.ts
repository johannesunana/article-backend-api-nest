import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class LoginUsernameDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9._-]+$/, {
    message:
      'username must contain only letters, numbers, dots, underscores, and hyphens',
  })
  username: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'password must be minimum eight (8) characters' })
  password: string;
}
