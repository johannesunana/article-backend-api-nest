import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be minimum eight (8) characters' })
  password: string;
}
// Reference: https://dev.to/abhivyaktii/understanding-dtos-data-transfer-objects-in-nestjs-52pb
