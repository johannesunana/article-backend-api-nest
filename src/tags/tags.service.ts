import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tag.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async createTag(createTagDto: CreateTagDto) {
    const existingTag = await this.prisma.tag.findUnique({
      where: {
        name: createTagDto.name,
      },
    });

    if (existingTag) {
      return existingTag;
    }

    return await this.prisma.tag.create({
      data: {
        ...createTagDto,
      },
    });
  }
}
