import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class ListArticleCommentsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  articleId: number;
}
