import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNaborDto } from './dto/create-nabor.dto';
import { UpdateNaborDto } from './dto/update-nabor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { realpath } from 'fs';

@Injectable()
export class NaborService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateNaborDto) {
    const created = await this.prisma.nabor.create({ data });
    return created;
  }

  async findAll() {
    const data = await this.prisma.nabor.findMany();
    return data;
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
