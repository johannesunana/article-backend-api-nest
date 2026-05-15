import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9\s]+$/, {
    message: 'Tag name can only contain letters, numbers, and spaces',
  })
  @Transform(({ value }) =>
    value.trim().toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-'),
  )
  name: string;
}
