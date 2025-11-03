import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNaborDto } from './dto/create-nabor.dto';
import { UpdateNaborDto } from './dto/update-nabor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { realpath } from 'fs';

@Injectable()
export class NaborService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateNaborDto) {
    const { price, ...res } = data;
    const created = await this.prisma.nabor.create({
      data: {
        ...res,
        price: Number(price),
      },
    });
    return {
      ...created,
      price: Number(created.price),
    };
  }

  async findAll() {
    const data = await this.prisma.nabor.findMany({
      select: {
        id: true,
        name_en: true,
        name_ru: true,
        name_uz: true,
        description_uz: true,
        description_ru: true,
        description_en: true,
        image: true,
        has_manual: true,
        createdAt: true,
        updatedAt: true,
        price: true,

        Materials: {
          select: {
            id: true,
            type: true,
            description_en: true,
            description_ru: true,
            description_uz: true,
          },
        },

        Accessories: {
          select: {
            id: true,
            name_en: true,
            name_ru: true,
            name_uz: true,
          },
        },

        Furnitures: {
          select: {
            id: true,
            name_en: true,
            name_ru: true,
            name_uz: true,
          },
        },

        Andozalar: {
          select: {
            id: true,
            name_en: true,
            name_ru: true,
            name_uz: true,
          },
        },

        Comments: {
          select: {
            id: true,
            name: true,
            message: true,
            rating: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return data.map((item) => ({
      ...item,
      price: Number(item.price),
    }));
  }

  async findOne(id: string) {
    const one = await this.prisma.nabor.findUnique({ where: { id } });
    if (!one) {
      throw new NotFoundException('nabot topilmadi');
    }
    return one;
  }

  async update(id: string, data: UpdateNaborDto) {
    await this.findOne(id);
    const updated = await this.prisma.nabor.update({ where: { id }, data });
    return updated;
  }

  async remove(id: string) {
    await this.findOne(id);
    const deleted = await this.prisma.nabor.delete({ where: { id } });
    return deleted;
  }
}
