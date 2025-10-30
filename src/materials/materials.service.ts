import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MaterialsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMaterialDto: CreateMaterialDto) {
    const exitingMaterial = await this.prisma.nabor.findUnique({
      where: { id: createMaterialDto.naborId },
    });
    if (!exitingMaterial) {
      throw new BadRequestException('nabor id topilmadi');
    }
    return this.prisma.materials.create({
      data: createMaterialDto,
    });
  }

  async findAll() {
    return this.prisma.materials.findMany({
      include: {
        nabor: true,
      },
    });
  }

  async findOne(id: string) {
    const material = await this.prisma.materials.findUnique({
      where: { id },
      include: {
        nabor: true,
      },
    });
    if (!material) throw new NotFoundException('Material topilmadi');
    return material;
  }

  async update(id: string, updateMaterialDto: UpdateMaterialDto) {
    const exist = await this.prisma.materials.findUnique({ where: { id } });
    if (!exist) throw new NotFoundException('Material topilmadi');

    return this.prisma.materials.update({
      where: { id },
      data: updateMaterialDto,
    });
  }

  async remove(id: string) {
    const exist = await this.prisma.materials.findUnique({ where: { id } });
    if (!exist) throw new NotFoundException('Material topilmadi');

    return this.prisma.materials.delete({ where: { id } });
  }
}
