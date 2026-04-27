import { IsString, IsEmail, IsInt, IsDate } from 'class-validator'

export class CreateUsersDto {
  @IsString()
  name: string;
  username: string;
  password: string;

  @IsEmail()
  email: string;

  @IsInt()
  id: Uint16Array;

  @IsDate
  createdAt: Date;
  updatedAt: Date;
}

// Reference: https://dev.to/abhivyaktii/understanding-dtos-data-transfer-objects-in-nestjs-52pb