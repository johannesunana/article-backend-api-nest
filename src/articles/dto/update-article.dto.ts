import { Type, Transform } from 'class-transformer';
import { IsInt, IsString, Min, IsOptional, IsArray, ArrayNotEmpty, Matches } from 'class-validator';

export class UpdateArticleDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id: number;

  @IsOptional()
  @IsString()
  title?: string | null;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsString()
  body?: string | null;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Matches(/^[a-zA-Z0-9\s-]+$/, {
    each: true,
    message: 'Each tag can only contain letters, numbers, spaces, and hyphens',
  })
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map((tag) =>
          tag
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-'),
        )
      : value,
  )
  tags?: string[];

}
