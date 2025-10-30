import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';

@Injectable()
export class AccessoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAccessoryDto) {
    const exitingMaterial = await this.prisma.nabor.findUnique({
      where: { id: data.naborId },
    });
    if (!exitingMaterial) {
      throw new BadRequestException('nabor id topilmadi');
    }
    const accessories = await this.prisma.accessories.create({
      data,
    });
    return {
      message: 'accessories muvaffaqiyatli yaratildi',
      data: accessories,
    };
  }

  async findAll() {
    const accessories = await this.prisma.accessories.findMany({
      include: { nabor: true },
      orderBy: { createdAt: 'desc' },
    });
    return {
      count: accessories.length,
      data: accessories,
    };
  }

  async findOne(id: string) {
    const accessories = await this.prisma.accessories.findUnique({
      where: { id },
      include: { nabor: true },
    });
    if (!accessories) {
      throw new NotFoundException('accessories topilmadi');
    }
    return accessories;
  }

  async update(id: string, updateaccessoriesDto: UpdateAccessoryDto) {
    const existing = await this.prisma.accessories.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(
        'Yangilamoqchi bo‘lgan accessories topilmadi',
      );
    }

    const updated = await this.prisma.accessories.update({
      where: { id },
      data: updateaccessoriesDto,
    });
    return {
      message: 'accessories muvaffaqiyatli yangilandi',
      data: updated,
    };
  }

  async remove(id: string) {
    const existing = await this.prisma.accessories.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException('O‘chiriladigan accessories topilmadi');
    }

    await this.prisma.accessories.delete({ where: { id } });
    return { message: 'accessories muvaffaqiyatli o‘chirildi' };
  }
}
