import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class DeleteCommentDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id: number;
}