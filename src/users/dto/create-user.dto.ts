import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'invalid email format' })
  email: string;

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
  @IsString()
  @MinLength(8, { message: 'password must be minimum eight (8) characters' })
  password: string;
}
// Reference: https://dev.to/abhivyaktii/understanding-dtos-data-transfer-objects-in-nestjs-52pb
