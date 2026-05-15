import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  body: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  articleId: number;
}
