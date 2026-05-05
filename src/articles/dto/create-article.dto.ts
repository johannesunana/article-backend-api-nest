import { Type, Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min, IsOptional, IsArray, ArrayNotEmpty, Matches } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  authorId: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Matches(/^[a-zA-Z0-9\s]+$/, {
    each: true,
    message: 'Each tag can only contain letters, numbers, and spaces',
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