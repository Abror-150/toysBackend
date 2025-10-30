import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';

@Injectable()
export class FurnituresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFurnitureDto) {
    const one = await this.prisma.nabor.findUnique({
      where: { id: data.naborId },
    });
    if (!one) {
      throw new BadRequestException('nabor topilmadi');
    }
    const furniture = await this.prisma.furnitures.create({
      data,
    });
    return {
      message: 'Furniture muvaffaqiyatli yaratildi',
      data: furniture,
    };
  }

  async findAll() {
    const furnitures = await this.prisma.furnitures.findMany({
      include: { nabor: true },
      orderBy: { createdAt: 'desc' },
    });
    return {
      count: furnitures.length,
      data: furnitures,
    };
  }

  async findOne(id: string) {
    const furniture = await this.prisma.furnitures.findUnique({
      where: { id },
      include: { nabor: true },
    });
    if (!furniture) {
      throw new NotFoundException('Furniture topilmadi');
    }
    return furniture;
  }

  async update(id: string, updateFurnitureDto: UpdateFurnitureDto) {
    const existing = await this.prisma.furnitures.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Yangilanish uchun furniture topilmadi');
    }

    const updated = await this.prisma.furnitures.update({
      where: { id },
      data: updateFurnitureDto,
    });
    return {
      message: 'Furniture muvaffaqiyatli yangilandi ',
      data: updated,
    };
  }

  async remove(id: string) {
    const existing = await this.prisma.furnitures.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('O‘chirish uchun furniture topilmadi');
    }

    await this.prisma.furnitures.delete({ where: { id } });
    return { message: 'Furniture muvaffaqiyatli o‘chirildi 🗑️' };
  }
}
