import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

}
// Reference: https://dev.to/abhivyaktii/understanding-dtos-data-transfer-objects-in-nestjs-52pb