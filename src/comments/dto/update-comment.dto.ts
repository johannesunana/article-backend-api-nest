import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class UpdateCommentDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id: number;

  @IsNotEmpty()
  @IsString()
  body: string;
}
