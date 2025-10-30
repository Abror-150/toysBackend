import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAndozalarDto } from './dto/create-andozalar.dto';
import { UpdateAndozalarDto } from './dto/update-andozalar.dto';

@Injectable()
export class AndozalarService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAndozalarDto) {
    const one = await this.prisma.nabor.findUnique({
      where: { id: data.naborId },
    });
    if (!one) {
      throw new BadRequestException('nabor topilmadi');
    }
    return this.prisma.andozalar.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.andozalar.findMany({
      include: {
        nabor: true,
      },
    });
  }

  async findOne(id: string) {
    const andoza = await this.prisma.andozalar.findUnique({
      where: { id },
      include: {
        nabor: true,
      },  
    });

    if (!andoza) {
      throw new NotFoundException(`Andoza with ID ${id} not found`);
    }
    return andoza;
  }

  async update(id: string, updateAndozalarDto: UpdateAndozalarDto) {
    const existing = await this.prisma.andozalar.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Andoza with ID ${id} not found`);
    }

    return this.prisma.andozalar.update({
      where: { id },
      data: updateAndozalarDto,
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.andozalar.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Andoza with ID ${id} not found`);
    }

    return this.prisma.andozalar.delete({
      where: { id },
    });
  }
}
